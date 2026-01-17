import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Transaction, PeriodFilter } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  dataService = inject(DataService);
  
  currentFilter = signal<PeriodFilter>({ period: 'all' });
  editingId = signal<string | null>(null);
  editForm = signal({
    description: '',
    categoryId: '',
    amount: 0
  });
  
  filteredTransactions = computed(() => 
    this.dataService.getTransactionsByPeriod(this.currentFilter())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  setPeriod(period: 'week' | 'month' | 'year' | 'all'): void {
    this.currentFilter.set({ period });
  }

  startEdit(transaction: Transaction): void {
    this.editingId.set(transaction.id);
    this.editForm.set({
      description: transaction.description,
      categoryId: transaction.categoryId,
      amount: transaction.amount
    });
  }

  saveEdit(): void {
    const id = this.editingId();
    if (!id) return;

    const form = this.editForm();
    this.dataService.updateTransaction(id, {
      description: form.description,
      categoryId: form.categoryId,
      amount: form.amount
    });

    this.editingId.set(null);
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  deleteTransaction(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
      this.dataService.deleteTransaction(id);
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.dataService.categories().find(c => c.id === categoryId);
    return category ? `${category.icon} ${category.name}` : 'Sin categoría';
  }

  getPersonName(personId: string): string {
    const person = this.dataService.people().find(p => p.id === personId);
    return person ? person.name : 'Desconocido';
  }

  getPersonColor(personId: string): string {
    const person = this.dataService.people().find(p => p.id === personId);
    return person?.color || '#95a5a6';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  updateEditField(field: string, value: any): void {
    this.editForm.update(form => ({ ...form, [field]: value }));
  }
}
