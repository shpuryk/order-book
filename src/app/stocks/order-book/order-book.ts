import { IOrder, IOrderBook, OrderType, OrderSide } from './order-book.models';

export class OrderBook implements IOrderBook {
  name: string;
  bids: Map<string, number>;
  asks: Map<string, number>;
  private orders: Map<string, IOrder> = new Map();
  constructor(name) {
    this.name = name;
    this.bids = new Map();
    this.asks = new Map();
  }

  update(order: IOrder): IOrderBook {
    switch (order.Type) {
      case OrderType.ADD:
        this.addOrder(order);
        break;
      case OrderType.DELETE:
        this.deleteOrder(order);
        break;
      case OrderType.REPLACE:
        this.replaceOrder(order);
        break;
      case OrderType.EXECUTED:
      case OrderType.EXECUTED_WITH_PRICE:
      case OrderType.CANCEL:
        this.cancelOrder(order);
        break;
      default:
        break;
    }
    return this;
  }

  private addOrder(order: IOrder): void {
    this.orders.set(order.OrderID, order);
    this.updateAggregation(order.Side, order.Price, +order.Shares);
  }

  private deleteOrder(order: IOrder): void {
    const orderToDelete = this.orders.get(order.OrderID);
    if (orderToDelete) {
      this.orders.delete(order.OrderID);
      this.updateAggregation(orderToDelete.Side, orderToDelete.Price, -orderToDelete.Shares
      );
    }
  }

  private replaceOrder(order: IOrder): void {
    const orderToReplace = this.orders.get(order.OriginalOrderID);
    if (orderToReplace) {
      this.orders.delete(orderToReplace.OrderID);
      this.orders.set(order.NewOrderID, {
        ...orderToReplace,
        OrderID: order.NewOrderID,
        Shares: order.Shares,
        Price: order.Price,
      });
      this.updateAggregation(orderToReplace.Side, orderToReplace.Price, -orderToReplace.Shares);
      this.updateAggregation(orderToReplace.Side, order.Price, order.Shares);
    }
  }

  private cancelOrder(order: IOrder): void {
    const diff = order.CanceledShares || order.ExecutedShares;
    const orderToCancel = this.orders.get(order.OrderID);
    if (orderToCancel) {
      this.updateAggregation(orderToCancel.Side, orderToCancel.Price, -diff);
      orderToCancel.Shares -= diff;
      if (orderToCancel.Shares <= 0) {
        this.orders.delete(order.OrderID);
      }
    }
  }

  private updateAggregation(orderSide: OrderSide, orderPrice: string, diff: number): void {
    if (!orderSide || !orderPrice) {
      return;
    }
    const group = orderSide === OrderSide.Buy ? this.bids : this.asks;
    const aggregation = +(group.get(orderPrice) || 0) + diff;
    if (aggregation > 0) {
      group.set(orderPrice, aggregation);
    } else {
      group.delete(orderPrice);
    }
  }
}
