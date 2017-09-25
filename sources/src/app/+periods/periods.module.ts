import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './periods.routes';
import { PeriodsComponent } from './periods.component';
import { PeriodComponent } from './period.component';
import { TimelineComponent } from '../+timeline/timeline.component';
import { TimegridComponent } from '../timegrid/timegrid.component';
import { CompiledPeriodService } from 'app/rest/resources/cppr/compiledperiod.service';
import { TimelineService } from 'app/rest/resources/timeline/timeline.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    PeriodsComponent,
    PeriodComponent,
    TimelineComponent,
    TimegridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes),
  ],
  providers: [CompiledPeriodService, TimelineService]
})
export class PeriodsModule {
  public static routes = routes;
}
