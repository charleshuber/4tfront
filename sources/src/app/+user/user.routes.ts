import { UserComponent } from './user.component';

export const routes = [
  { path: '', children: [
    { path: '', component: UserComponent }
  ]},
];
