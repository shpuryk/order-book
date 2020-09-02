import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { StockGuard } from './stocks/stock-can-activate.guard';
import { StockDetailsComponent } from './stocks/stock-details/stock-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stocks',
    pathMatch: 'full',
  },
  {
    path: 'stocks',
    component: StocksComponent,
    children: [
      {
        path: ':name',
        component: StockDetailsComponent,
        canActivate: [StockGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'stocks/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
