import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { stocks } from '../stocks.constants';

@Injectable({
  providedIn: 'root'
})
export class StockGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stockExists = stocks.includes(next.params.name);
    if (!stockExists) {
      this.router.navigate(['stocks', stocks[0]]);
    }
    return stockExists;
  }
}
