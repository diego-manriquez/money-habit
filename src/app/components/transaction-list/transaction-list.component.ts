import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Transaction, PeriodFilter } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  dataService = inject(DataService);
  
  currentFilter = signal<PeriodFilter>({ period: 'all' });
  
  filteredTransactions = computed(() => 
    this.dataService.getTransactionsByPeriod(this.currentFilter())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  setPeriod(period: 'week' | 'month' | 'year' | 'all'): void {
    this.currentFilter.set({ period });
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
}
