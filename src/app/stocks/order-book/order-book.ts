import { IOrder, IOrderBook } from './order-book.models';

export class OrderBook implements IOrderBook {
    name: string;
    bids: number[];
    asks: number[];
    constructor(name) {
        this.name = name;
        this.bids = [];
        this.asks = [];
    }

    update(order: IOrder): IOrderBook {
        return this;
    }
}
