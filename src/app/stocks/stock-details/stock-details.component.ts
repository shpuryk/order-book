import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { IStockDetailsParams } from '../stocks.models';
import { IOrderBook } from '../order-book/order-book.models';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnDestroy {

  orderBookSunscription: Subscription;
  orderBook: IOrderBook;

  constructor(
    private activeRoute: ActivatedRoute,
    private data: DataService
  ) {
    this.activeRoute.params.subscribe((val: IStockDetailsParams)  => {
      if (this.orderBookSunscription) {
        this.orderBookSunscription.unsubscribe();
      }
      this.orderBookSunscription = this.data.getOrderBook(val.name).subscribe(ob => {
        console.log(ob);
        this.orderBook = ob;
      });

    });
  }

  ngOnDestroy(): void {
    if (this.orderBookSunscription) {
      this.orderBookSunscription.unsubscribe();
    }
  }

}
