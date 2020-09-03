import { TestBed, async } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { OrderBook } from './order-book/order-book';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useValue: { get: () => of([{}])}
      }]
    });
    service = TestBed.inject(DataService);
  });

  it('should set to orderBooksMap on first call getOrderBook ', () => {
    const stock1 = 'Stock1';
    service.getOrderBook(stock1).subscribe();
    expect(service.orderBooksMap[stock1]).toEqual(jasmine.objectContaining({
      index: 0,
      orderBook: new OrderBook(stock1)
    }));
  });
});
