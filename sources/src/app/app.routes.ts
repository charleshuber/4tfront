import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'user', loadChildren: './+user#UserModule'},
  { path: 'periods', loadChildren: './+periods#PeriodsModule'},
  { path: '**',    component: NoContentComponent },
];
