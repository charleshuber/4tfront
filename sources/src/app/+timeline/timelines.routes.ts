import { TimelineComponent } from './timeline.component';

export const routes = [
  { path: '', children: [
    { path: 'timeline-detail/:id', component: TimelineComponent }
  ]},
];
