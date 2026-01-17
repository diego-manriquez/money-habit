import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Category } from '../../models/transaction.model';

@Component({
  selector: 'app-categories-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.css']
})
export class CategoriesManagerComponent {
  dataService = inject(DataService);
  
  showForm = signal(false);
  editingId = signal<string | null>(null);
  
  formData = signal({
    name: '',
    icon: '📦',
    color: '#95A5A6'
  });

  availableIcons = ['🍔', '👕', '💊', '✈️', '💳', '🎮', '🔧', '🏠', '🚗', '📱', '🎓', '🎬', '🏃', '🎨', '📦', '💰', '🎁', '🛒'];
  availableColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7B731', '#5F27CD', '#00D2D3', '#26DE81', '#95A5A6', '#E74C3C', '#3498DB'];

  openForm(category?: Category): void {
    if (category) {
      this.editingId.set(category.id);
      this.formData.set({
        name: category.name,
        icon: category.icon || '📦',
        color: category.color || '#95A5A6'
      });
    } else {
      this.editingId.set(null);
      this.formData.set({
        name: '',
        icon: '📦',
        color: '#95A5A6'
      });
    }
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  onSubmit(): void {
    const form = this.formData();
    
    if (!form.name.trim()) {
      alert('Por favor ingresa un nombre para la categoría');
      return;
    }

    if (this.editingId()) {
      this.dataService.updateCategory(this.editingId()!, form);
    } else {
      this.dataService.addCategory(form);
    }

    this.closeForm();
  }

  deleteCategory(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.dataService.deleteCategory(id);
    }
  }

  updateField(field: string, value: any): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
