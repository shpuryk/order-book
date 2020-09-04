import { Injectable } from '@angular/core';
import { Observable, of, merge, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, mergeAll, filter, tap, map, switchMap } from 'rxjs/operators';
import { IOrder, IOrderBook, IOrderBooksMap } from './order-book/order-book.models';
import { OrderBook } from './order-book/order-book';
import { DEFAULT_FREQUENCY } from './stocks.constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private frequency = DEFAULT_FREQUENCY;

  private frequency$ = new BehaviorSubject(DEFAULT_FREQUENCY);

  orderBooksMap: IOrderBooksMap = {};

  constructor(private http: HttpClient) {}

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
      this.frequency$.pipe(
        switchMap(f => {
          return this.getNextOrders(stockName, orderBookMeta.index).pipe(
            map(order => {
              console.log(order);
              orderBookMeta.index++;
              return orderBookMeta.orderBook.update(order);
            })
          );
        })
      ),
    );
  }

  setFrequency(value: number): void {
    this.frequency$.next(value);
  }

  getFrequency(): number {
    return this.frequency$.getValue();
  }

  private getNextOrders(stockName: string, startFromIndex: number = 0): Observable<IOrder> {
    return this.getJSONData(stockName).pipe(
      mergeAll()
    ).pipe(
      filter((v, i) => i >= startFromIndex),
      concatMap(item => of(item).pipe(delay(this.getFrequency())))
    );
  }

  private getJSONData(stockName): Observable<IOrder[]> {
    return this.http.get(`./assets/${stockName}.json`) as Observable<IOrder[]>;
  }
}
