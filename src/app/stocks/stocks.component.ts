import { Component } from '@angular/core';
import { stocks } from './stocks.constants';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})

export class StocksComponent {
  readonly stocks = stocks;
}
