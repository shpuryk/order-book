import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StockDetailsComponent } from './stock-details.component';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { DataService } from '../data.service';

describe('StockDetailsComponent', () => {
  let component: StockDetailsComponent;
  let fixture: ComponentFixture<StockDetailsComponent>;

  const mockParams = new Subject();
  const mockDataService = { getOrderBook: (name) => of({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: mockParams }},
        { provide: DataService, useValue: mockDataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should get order book on change params (stock)', async(() => {
    spyOn(mockDataService, 'getOrderBook').and.callThrough();
    mockParams.next({name: 'Stock1'});
    expect(mockDataService.getOrderBook).toHaveBeenCalledWith('Stock1');
  }));

  it('should switch order book on next change params (stock)', async(() => {
    spyOn(mockDataService, 'getOrderBook').and.callThrough();
    mockParams.next({name: 'Stock1'});
    // spyOn(component.orderBookSunscription, 'unsubscribe');
    mockParams.next({name: 'Stock2'});
    // expect(component.orderBookSunscription.unsubscribe).toHaveBeenCalled();
    expect(mockDataService.getOrderBook).toHaveBeenCalledWith('Stock2');
  }));

});
