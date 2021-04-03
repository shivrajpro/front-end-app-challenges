import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './components/restaurant/restaurant-detail/restaurant-detail.component';
import { RestaurantService } from "./services/restaurant.service";
import { RestaurantsListComponent } from './components/restaurant/restaurants-list/restaurants-list.component';
import { RestaurantItemComponent } from './components/restaurant/restaurants-list/restaurant-item/restaurant-item.component';
import { NameFilterPipePipe } from './pipes/name-filter-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    RestaurantsListComponent,
    RestaurantItemComponent,
    NameFilterPipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
