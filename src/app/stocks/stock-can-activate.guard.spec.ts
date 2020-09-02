import { TestBed } from '@angular/core/testing';
import { StockGuard } from './stock-can-activate.guard';
import * as constants from './stocks.constants';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

describe('StockGuard', () => {
  let guard: StockGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{provide: Router, useValue: routerSpy}]
    });
    guard = TestBed.inject(StockGuard);
  });

  it('guard should pass when stock exists', () => {
    const res = guard.canActivate({params: {name: 'EQL'}} as any, null);
    expect(res).toBeTruthy();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('guard should not pass when stock does not exists', () => {
    const res = guard.canActivate({params: {name: 'wrong'}} as any, null);
    expect(res).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });
});
