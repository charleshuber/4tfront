import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './periods.routes';
import { TimelineComponent } from './timeline.component';
import { TimelineService } from 'app/rest/resources/timeline/timeline.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    TimelineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes),
  ],
  providers: [TimelineService]
})
export class TimelinesModule {
  public static routes = routes;
}
