import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription, interval, Subject } from 'rxjs';
import { IStockDetailsParams } from '../stocks.models';
import { IOrderBook } from '../order-book/order-book.models';
import { throttle, takeUntil, debounce, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_DEPTH } from '../stocks.constants';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDetailsComponent implements OnInit, OnDestroy {
  orderBookSunscription: Subscription;
  orderBook: IOrderBook;
  depth = DEFAULT_DEPTH;
  configForm: FormGroup;

  private destroy$ = new Subject();

  constructor(
    private activeRoute: ActivatedRoute,
    private data: DataService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.activeRoute.params.subscribe((val: IStockDetailsParams)  => {
      if (this.orderBookSunscription) {
        this.orderBookSunscription.unsubscribe();
      }
      this.orderBookSunscription = this.data.getOrderBook(val.name).pipe(
        throttle(e => interval(500)),
        takeUntil(this.destroy$)
      ).subscribe(ob => {
        this.orderBook = ob;
        this.cd.markForCheck();
      });
    });
  }

  ngOnInit(): void {
    this.configForm = this.fb.group({
      depth: [this.depth, Validators.min(1)],
      frequency: [this.data.getFrequency(), Validators.min(1)]
    });
    this.initListeners();
  }

  initListeners(): void {
    this.configForm.get('depth').valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(v => {
      if (v < 1) {
        return;
      }
      this.depth = v;
    });
    this.configForm.get('frequency').valueChanges.pipe(
      takeUntil(this.destroy$),
      debounce(e => interval(500)),
      distinctUntilChanged()
    ).subscribe(v => {
      if (v < 1) {
        return;
      }
      this.data.setFrequency(v);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
