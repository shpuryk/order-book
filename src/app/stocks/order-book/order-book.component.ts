import { Component, OnInit, Input } from '@angular/core';
import { IOrderBook } from './order-book.models';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent {

  @Input() orderBook: IOrderBook;
  @Input() depth: number;

  sortFn = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return a.key < b.key ? 1 : (b.key < a.key ? -1 : 0);
  }

  getAskStart(size): number {
    return size - this.depth < 0 ? 0 : size - this.depth;
  }
}
