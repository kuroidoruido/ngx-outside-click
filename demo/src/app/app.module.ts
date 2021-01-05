import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxOutsideClickModule } from 'ngx-outside-click';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxOutsideClickModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
