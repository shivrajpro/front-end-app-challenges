import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NoodlesComponent } from './components/noodles/noodles.component';
import { NoodlesDetailComponent } from './components/noodles/noodles-detail/noodles-detail.component';
import { NoodlesService } from "./services/noodles.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NoodlesComponent,
    NoodlesDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [NoodlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
