import { OrderBook } from './order-book';
import { OrderType, OrderSide } from './order-book.models';

describe('order-book', () => {
  it('should init', () => {
    const orderBook = new OrderBook('stock');
    expect(orderBook).toEqual(
      jasmine.objectContaining({
        name: 'stock',
        bids: new Map(),
        asks: new Map(),
      })
    );
  });

  it('should add bid order', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '1',
      Side: OrderSide.Buy,
      Shares: 2500,
      Price: '56.45',
    });
    expect(orderBook.bids.get('56.45')).toEqual(2500);
  });

  it('should add ask order', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '2',
      Side: OrderSide.Sell,
      Shares: 1000,
      Price: '56.40',
    });
    expect(orderBook.asks.get('56.40')).toEqual(1000);
  });

  it('should aggregate two sell orders', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '1',
      Side: OrderSide.Sell,
      Shares: 100,
      Price: '56.40',
    });
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '2',
      Side: OrderSide.Sell,
      Shares: 100,
      Price: '56.40',
    });
    expect(orderBook.asks.get('56.40')).toEqual(200);
  });

  it('should aggregate add and delete', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '1',
      Side: OrderSide.Sell,
      Shares: 100,
      Price: '56.40',
    });
    orderBook.update({
      Type: OrderType.DELETE,
      OrderID: '1',
    });
    expect(orderBook.asks.get('56.40')).toEqual(undefined);
  });

  it('should aggregate add and cancel', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '1',
      Side: OrderSide.Sell,
      Shares: 100,
      Price: '56.40',
    });
    orderBook.update({
      Type: OrderType.CANCEL,
      OrderID: '1',
      CanceledShares: 60,
    });
    expect(orderBook.asks.get('56.40')).toEqual(40);
  });

  it('should aggregate add and executed', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '1',
      Side: OrderSide.Buy,
      Shares: 100,
      Price: '56.40',
    });
    orderBook.update({
      Type: OrderType.EXECUTED,
      OrderID: '1',
      ExecutedShares: 30,
    });
    orderBook.update({
      Type: OrderType.EXECUTED_WITH_PRICE,
      OrderID: '1',
      ExecutedShares: 25,
    });
    expect(orderBook.bids.get('56.40')).toEqual(45);
  });

  it('should aggregate add and replace', () => {
    const orderBook = new OrderBook('stock');
    orderBook.update({
      Type: OrderType.ADD,
      OrderID: '1',
      Side: OrderSide.Buy,
      Shares: 100,
      Price: '56.40',
    });
    orderBook.update({
      Type: OrderType.REPLACE,
      OriginalOrderID: '1',
      NewOrderID: '2',
      Shares: 90,
      Price: '56.50',
    });
    expect(orderBook.bids.get('56.40')).toEqual(undefined);
    expect(orderBook.bids.get('56.50')).toEqual(90);
  });
});
