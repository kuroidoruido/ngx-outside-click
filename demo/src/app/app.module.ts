import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxOutsideClickModule } from 'ngx-outside-click';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxOutsideClickModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
