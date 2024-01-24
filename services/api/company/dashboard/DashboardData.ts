import type {ByDate, EventInfoType, SaleByStatus, SaleInfoType} from '~/services/api/company/dashboard/DashboardType';

export class EventInfoData {
  datesWithEvents: ByDate[];
  totalEvents: number;
  totalSeats: number;
  totalAvailableSeats: number;

  constructor(data: EventInfoType) {
    this.datesWithEvents = data.datesWithEvents;
    this.totalEvents = data.totalEvents;
    this.totalSeats = data.totalSeats;
    this.totalAvailableSeats = data.totalAvailableSeats;
  }
}

export class SaleInfoData {
  salesByDate: ByDate[];
  salesByStatus: SaleByStatus[];

  constructor(data: SaleInfoType) {
    this.salesByDate = data.salesByDate;
    this.salesByStatus = data.salesByStatus;
  }
}
