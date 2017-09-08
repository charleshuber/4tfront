import { PeriodsComponent } from './periods.component';

export const routes = [
  { path: '', children: [
    { path: '', component: PeriodsComponent }
  ]},
];
