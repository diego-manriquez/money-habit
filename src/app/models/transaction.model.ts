export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  categoryId: string;
  personId: string;
  date: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface Person {
  id: string;
  name: string;
  color?: string;
}

export interface Statistics {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: { [categoryId: string]: number };
  byPerson: { [personId: string]: { income: number; expenses: number } };
}

export interface PeriodFilter {
  period: 'week' | 'month' | 'year' | 'all';
  startDate?: Date;
  endDate?: Date;
}
