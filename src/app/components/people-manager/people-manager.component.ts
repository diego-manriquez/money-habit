import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Person } from '../../models/transaction.model';

@Component({
  selector: 'app-people-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './people-manager.component.html',
  styleUrls: ['./people-manager.component.css']
})
export class PeopleManagerComponent {
  dataService = inject(DataService);
  
  showForm = signal(false);
  editingId = signal<string | null>(null);
  
  formData = signal({
    name: '',
    color: '#3498db'
  });

  availableColors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22', '#16a085', '#c0392b'];

  openForm(person?: Person): void {
    if (person) {
      this.editingId.set(person.id);
      this.formData.set({
        name: person.name,
        color: person.color || '#3498db'
      });
    } else {
      this.editingId.set(null);
      this.formData.set({
        name: '',
        color: '#3498db'
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
      alert('Por favor ingresa un nombre');
      return;
    }

    if (this.editingId()) {
      this.dataService.updatePerson(this.editingId()!, form);
    } else {
      this.dataService.addPerson(form);
    }

    this.closeForm();
  }

  deletePerson(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      this.dataService.deletePerson(id);
    }
  }

  updateField(field: string, value: any): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
