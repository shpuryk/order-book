export interface IOrderBook {
    name: string;
    bids: Map<string, number>;
    asks: Map<string, number>;
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
    OrderID?: string;
    OriginalOrderID?: string;
    NewOrderID?: string;
    Side?: OrderSide;
    Shares?: number;
    Stock?: string;
    Price?: string;
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

