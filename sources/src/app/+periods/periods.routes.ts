import { PeriodsComponent } from './periods.component';
import { PeriodComponent } from './period.component';

export const routes = [
  { path: '', children: [
    { path: '', component: PeriodsComponent },
    { path: 'details', component: PeriodComponent }
  ]},
];
