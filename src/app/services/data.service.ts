import { Injectable, signal } from '@angular/core';
import { Transaction, Category, Person, TransactionType, Statistics, PeriodFilter } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Signals para reactive state management
  transactions = signal<Transaction[]>([]);
  categories = signal<Category[]>([]);
  people = signal<Person[]>([]);

  constructor() {
    this.loadFromLocalStorage();
    this.initializeDefaultData();
  }

  // ===== TRANSACTIONS =====
  addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): void {
    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.transactions.update(trans => [...trans, newTransaction]);
    this.saveToLocalStorage();
  }

  updateTransaction(id: string, updates: Partial<Transaction>): void {
    this.transactions.update(trans =>
      trans.map(t => t.id === id ? { ...t, ...updates } : t)
    );
    this.saveToLocalStorage();
  }

  deleteTransaction(id: string): void {
    this.transactions.update(trans => trans.filter(t => t.id !== id));
    this.saveToLocalStorage();
  }

  getTransactionsByPeriod(filter: PeriodFilter): Transaction[] {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = new Date(now);

    switch (filter.period) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
      default:
        return this.transactions();
    }

    if (filter.startDate) startDate = filter.startDate;
    if (filter.endDate) endDate = filter.endDate;

    return this.transactions().filter(t => {
      const transDate = new Date(t.date);
      return transDate >= startDate && transDate <= endDate;
    });
  }

  // ===== CATEGORIES =====
  addCategory(category: Omit<Category, 'id'>): void {
    const newCategory: Category = {
      ...category,
      id: this.generateId()
    };
    this.categories.update(cats => [...cats, newCategory]);
    this.saveToLocalStorage();
  }

  updateCategory(id: string, updates: Partial<Category>): void {
    this.categories.update(cats =>
      cats.map(c => c.id === id ? { ...c, ...updates } : c)
    );
    this.saveToLocalStorage();
  }

  deleteCategory(id: string): void {
    this.categories.update(cats => cats.filter(c => c.id !== id));
    this.saveToLocalStorage();
  }

  // ===== PEOPLE =====
  addPerson(person: Omit<Person, 'id'>): void {
    const newPerson: Person = {
      ...person,
      id: this.generateId()
    };
    this.people.update(people => [...people, newPerson]);
    this.saveToLocalStorage();
  }

  updatePerson(id: string, updates: Partial<Person>): void {
    this.people.update(people =>
      people.map(p => p.id === id ? { ...p, ...updates } : p)
    );
    this.saveToLocalStorage();
  }

  deletePerson(id: string): void {
    this.people.update(people => people.filter(p => p.id !== id));
    this.saveToLocalStorage();
  }

  // ===== STATISTICS =====
  getStatistics(filter: PeriodFilter): Statistics {
    const filteredTransactions = this.getTransactionsByPeriod(filter);
    
    const stats: Statistics = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      byCategory: {},
      byPerson: {}
    };

    filteredTransactions.forEach(t => {
      if (t.type === TransactionType.INCOME) {
        stats.totalIncome += t.amount;
      } else {
        stats.totalExpenses += t.amount;
      }

      // By category (only expenses)
      if (t.type === TransactionType.EXPENSE) {
        stats.byCategory[t.categoryId] = (stats.byCategory[t.categoryId] || 0) + t.amount;
      }

      // By person
      if (!stats.byPerson[t.personId]) {
        stats.byPerson[t.personId] = { income: 0, expenses: 0 };
      }
      if (t.type === TransactionType.INCOME) {
        stats.byPerson[t.personId].income += t.amount;
      } else {
        stats.byPerson[t.personId].expenses += t.amount;
      }
    });

    stats.balance = stats.totalIncome - stats.totalExpenses;
    return stats;
  }

  // ===== HELPERS =====
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions()));
    localStorage.setItem('categories', JSON.stringify(this.categories()));
    localStorage.setItem('people', JSON.stringify(this.people()));
  }

  private loadFromLocalStorage(): void {
    const transactions = localStorage.getItem('transactions');
    const categories = localStorage.getItem('categories');
    const people = localStorage.getItem('people');

    if (transactions) {
      const parsed = JSON.parse(transactions);
      // Convert date strings back to Date objects
      parsed.forEach((t: any) => {
        t.date = new Date(t.date);
        t.createdAt = new Date(t.createdAt);
      });
      this.transactions.set(parsed);
    }
    if (categories) this.categories.set(JSON.parse(categories));
    if (people) this.people.set(JSON.parse(people));
  }

  private initializeDefaultData(): void {
    // Initialize default categories if none exist
    if (this.categories().length === 0) {
      const defaultCategories: Omit<Category, 'id'>[] = [
        { name: 'Comida', icon: '🍔', color: '#FF6B6B' },
        { name: 'Ropa', icon: '👕', color: '#4ECDC4' },
        { name: 'Medicina', icon: '💊', color: '#45B7D1' },
        { name: 'Viajes', icon: '✈️', color: '#F7B731' },
        { name: 'Deudas', icon: '💳', color: '#5F27CD' },
        { name: 'Entretenimiento', icon: '🎮', color: '#00D2D3' },
        { name: 'Servicios', icon: '🔧', color: '#26DE81' },
        { name: 'Otros', icon: '📦', color: '#95A5A6' }
      ];
      defaultCategories.forEach(cat => this.addCategory(cat));
    }

    // Initialize default people if none exist
    if (this.people().length === 0) {
      const defaultPeople: Omit<Person, 'id'>[] = [
        { name: 'Diego', color: '#3498db' },
        { name: 'Erika', color: '#e74c3c' },
        { name: 'Familia', color: '#27ae60' }
      ];
      defaultPeople.forEach(person => this.addPerson(person));
    }
  }
}
