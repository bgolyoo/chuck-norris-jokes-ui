import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { FooterComponent } from './footer/footer.component';

import { ApiService } from './shared/services/api-service';


@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
