import { Injectable } from '@angular/core';
import { Observable, from, of, Subscription, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, mergeAll, filter, tap, map } from 'rxjs/operators';
import { IOrder, IOrderBook, IOrderBooksMap } from './order-book/order-book.models';
import { OrderBook } from './order-book/order-book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  frequency = 50;

  orderBooksMap: IOrderBooksMap = {};

  getOrdersSunscription: Subscription;

  constructor(private http: HttpClient) { }

  getOrderBook(stockName: string): Observable<IOrderBook> {
    if (!this.orderBooksMap[stockName]) {
      this.orderBooksMap[stockName] = {
        index: 0,
        orderBook: new OrderBook(stockName)
      };
    }
    const orderBookMeta = this.orderBooksMap[stockName];
    return merge(
      of(orderBookMeta.orderBook),
      this.getNextOrders(stockName, orderBookMeta.index).pipe(
        map(order => {
          orderBookMeta.index++;
          return orderBookMeta.orderBook.update(order);
      }))
    );
  }

  private getNextOrders(stockName: string, startFromIndex: number = 0): Observable<IOrder> {
    return this.getJSONData(stockName).pipe(
      mergeAll()
    ).pipe(
      filter((v, i) => i >= startFromIndex),
      concatMap(item => of(item).pipe(delay(this.frequency)))
    );
  }

  private getJSONData(stockName): Observable<IOrder[]> {
    return this.http.get(`./assets/${stockName}.json`) as Observable<IOrder[]>;
  }
}
