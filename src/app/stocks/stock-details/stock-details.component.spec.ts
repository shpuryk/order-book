import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailsComponent } from './stock-details.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('StockDetailsComponent', () => {
  let component: StockDetailsComponent;
  let fixture: ComponentFixture<StockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetailsComponent ],
      providers: [{ provide: ActivatedRoute, useValue: { params: of({}) }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
