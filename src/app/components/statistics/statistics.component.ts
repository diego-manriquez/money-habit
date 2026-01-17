import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { PeriodFilter } from '../../models/transaction.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  dataService = inject(DataService);
  
  currentPeriod = signal<PeriodFilter>({ period: 'month' });
  
  statistics = computed(() => 
    this.dataService.getStatistics(this.currentPeriod())
  );

  categoryBreakdown = computed(() => {
    const stats = this.statistics();
    const categories = this.dataService.categories();
    
    return Object.entries(stats.byCategory)
      .map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        const percentage = stats.totalExpenses > 0 
          ? (amount / stats.totalExpenses) * 100 
          : 0;
        
        return {
          id: categoryId,
          name: category?.name || 'Desconocida',
          icon: category?.icon || '📦',
          color: category?.color || '#95A5A6',
          amount,
          percentage
        };
      })
      .sort((a, b) => b.amount - a.amount);
  });

  personBreakdown = computed(() => {
    const stats = this.statistics();
    const people = this.dataService.people();
    
    return Object.entries(stats.byPerson)
      .map(([personId, data]) => {
        const person = people.find(p => p.id === personId);
        return {
          id: personId,
          name: person?.name || 'Desconocido',
          color: person?.color || '#95A5A6',
          income: data.income,
          expenses: data.expenses,
          balance: data.income - data.expenses
        };
      })
      .sort((a, b) => b.expenses - a.expenses);
  });

  setPeriod(period: 'week' | 'month' | 'year' | 'all'): void {
    this.currentPeriod.set({ period });
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
