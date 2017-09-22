import { PeriodsComponent } from './periods.component';
import { PeriodComponent } from './period.component';
import { TimelineComponent } from '../timeline/timeline.component';

export const routes = [
  { path: '', children: [
    { path: '', component: PeriodsComponent },
    { path: 'details', component: PeriodComponent },
    { path: 'timeline-detail/:id', component: TimelineComponent }
  ]},
];
