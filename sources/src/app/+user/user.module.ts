import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './user.routes';
import { UserComponent } from './user.component';
import { UserService } from 'app/rest/resources/user/user.service';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forChild(routes),
  ],
  providers: [UserService]
})
export class UserModule {
  public static routes = routes;
}
