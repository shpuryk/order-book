import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockDetailsComponent } from './stocks/stock-details/stock-details.component';
import { OrderBookComponent } from './stocks/order-book/order-book.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    StockDetailsComponent,
    OrderBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
