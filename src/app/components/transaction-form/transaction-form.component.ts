import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { TransactionType } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  dataService = inject(DataService);
  
  TransactionType = TransactionType;
  
  formData = signal({
    type: TransactionType.EXPENSE,
    amount: 0,
    description: '',
    categoryId: '',
    personId: '',
    date: new Date().toISOString().split('T')[0]
  });

  showSuccess = signal(false);

  onSubmit(): void {
    const form = this.formData();
    
    if (!form.amount || !form.description || !form.categoryId || !form.personId) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.dataService.addTransaction({
      type: form.type,
      amount: form.amount,
      description: form.description,
      categoryId: form.categoryId,
      personId: form.personId,
      date: new Date(form.date)
    });

    // Reset form
    this.formData.set({
      type: TransactionType.EXPENSE,
      amount: 0,
      description: '',
      categoryId: '',
      personId: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Show success message
    this.showSuccess.set(true);
    setTimeout(() => this.showSuccess.set(false), 3000);
  }

  updateField(field: string, value: any): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
