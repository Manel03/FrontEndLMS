import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { FirstPageComponent } from './first-page/first-page.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'first-page',
    component: FirstPageComponent,
    data: {
      title: 'LMS',
    },
  },
];
