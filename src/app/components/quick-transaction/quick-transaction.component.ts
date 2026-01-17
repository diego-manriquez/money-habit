import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { TransactionType } from '../../models/transaction.model';

@Component({
  selector: 'app-quick-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-transaction.component.html',
  styleUrls: ['./quick-transaction.component.css']
})
export class QuickTransactionComponent {
  dataService = inject(DataService);
  
  TransactionType = TransactionType;
  
  amount = signal<number>(0);
  selectedPersonId = signal<string>('');
  selectedType = signal<TransactionType>(TransactionType.EXPENSE);
  showSuccess = signal(false);

  selectPerson(personId: string): void {
    this.selectedPersonId.set(personId);
  }

  selectType(type: TransactionType): void {
    this.selectedType.set(type);
  }

  addQuickTransaction(): void {
    if (!this.amount() || this.amount() <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }

    if (!this.selectedPersonId()) {
      alert('Por favor selecciona una persona');
      return;
    }

    // Buscar la categoría "Otros" como default
    const defaultCategory = this.dataService.categories().find(c => 
      c.name.toLowerCase() === 'otros'
    ) || this.dataService.categories()[0];
    
    if (!defaultCategory) {
      alert('No hay categorías disponibles');
      return;
    }

    this.dataService.addTransaction({
      type: this.selectedType(),
      amount: this.amount(),
      description: 'Transacción rápida',
      categoryId: defaultCategory.id,
      personId: this.selectedPersonId(),
      date: new Date()
    });

    // Reset form
    this.amount.set(0);
    this.selectedPersonId.set('');
    
    // Show success message
    this.showSuccess.set(true);
    setTimeout(() => this.showSuccess.set(false), 2000);
  }

  getPersonColor(personId: string): string {
    const person = this.dataService.people().find(p => p.id === personId);
    return person?.color || '#95a5a6';
  }
}
