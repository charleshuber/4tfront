import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './periods.routes';
import { PeriodsComponent } from './periods.component';
import { PeriodComponent } from './period.component';
import { CompiledPeriodService } from 'app/rest/resources/cppr/compiledperiod.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    PeriodsComponent,
    PeriodComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes),
  ],
  providers: [CompiledPeriodService]
})
export class PeriodsModule {
  public static routes = routes;
}
