import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, interval } from 'rxjs';
import { IStockDetailsParams } from '../stocks.models';
import { IOrderBook } from '../order-book/order-book.models';
import { throttle } from 'rxjs/operators';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDetailsComponent implements OnDestroy {

  orderBookSunscription: Subscription;
  orderBook: IOrderBook;

  asks: [string, number][];
  bids: [string, number][];

  depth = 5;

  constructor(
    private activeRoute: ActivatedRoute,
    private data: DataService,
    private cd: ChangeDetectorRef
  ) {
    this.activeRoute.params.subscribe((val: IStockDetailsParams)  => {
      if (this.orderBookSunscription) {
        this.orderBookSunscription.unsubscribe();
      }
      this.orderBookSunscription = this.data.getOrderBook(val.name).pipe(
        throttle(e => interval(500)),
      ).subscribe(ob => {
        this.orderBook = ob;
        this.cd.markForCheck();
      });
    });
  }

  sortFn = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return a.key < b.key ? 1 : (b.key < a.key ? -1 : 0);
  }

  ngOnDestroy(): void {
    if (this.orderBookSunscription) {
      this.orderBookSunscription.unsubscribe();
    }
  }

}
