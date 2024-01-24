export interface ByDate {
    date: string;
    count?: number;
}

export interface SaleByStatus {
    status: string;
    count?: number;
    amountCents?: number;
}

export interface EventInfoType {
    datesWithEvents: ByDate[];
    totalEvents: number;
    totalSeats: number;
    totalAvailableSeats: number;
}

export interface SaleInfoType {
    salesByDate: ByDate[];
    salesByStatus: SaleByStatus[];
}
