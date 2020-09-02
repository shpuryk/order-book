import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  stockName: string;
  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(val  => {
      this.stockName = val.name;
    });
  }

  ngOnInit(): void {
  }

}
