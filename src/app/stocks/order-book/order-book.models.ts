export interface IOrderBook {
    name: string;
    bids: number[];
    asks: number[];
    update: (order: IOrder) => IOrderBook;
}

export interface IOrderBooksMap {
    [name: string]: {
        index: number,
        orderBook: IOrderBook
    };
}

export interface IOrder {
    Type: OrderType;
    OrderID: number;
    Side?: OrderSide;
    NewOrderID?: number;
    Shares?: number;
    Stock?: string;
    Price?: number;
    ExecutedShares?: number;
    CanceledShares?: number;
}

export enum OrderType {
    DELETE = 'DELETE',
    ADD = 'ADD',
    CANCEL = 'CANCEL',
    EXECUTED = 'EXECUTED',
    EXECUTED_WITH_PRICE = 'EXECUTED_WITH_PRICE',
    REPLACE = 'REPLACE '
}

export enum OrderSide {
    Buy = 'B',
    Sell = 'S'
}
