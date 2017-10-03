import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EstablishmentCardComponent } from 'app/components/establishment-card/establishment-card.component';
import { NouisliderModule } from 'ng2-nouislider/src/nouislider';

@NgModule({
  declarations: [
    AppComponent,
    EstablishmentCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NouisliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
