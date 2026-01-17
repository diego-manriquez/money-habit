import { Routes } from '@angular/router';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CategoriesManagerComponent } from './components/categories-manager/categories-manager.component';
import { PeopleManagerComponent } from './components/people-manager/people-manager.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TransactionListComponent },
  { path: 'new-transaction', component: TransactionFormComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'categories', component: CategoriesManagerComponent },
  { path: 'people', component: PeopleManagerComponent }
];
