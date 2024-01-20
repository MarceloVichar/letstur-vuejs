import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {CostumerType, EventSaleType, SaleType} from '~/services/api/company/sale/SaleType';
import type {UserType} from '~/services/api/shared/users/UserType';

export class SaleData {
  id: number;
  customer?: CostumerType;
  status?: string;
  voucher?: string;
  totalValueCents?: number;
  sellerId?: number;
  seller?: UserType;
  events?: EventSaleType[];
  companyId?: number;
  company?: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: SaleType) {
    this.id = data.id;
    this.customer = data.customer;
    this.status = data.status;
    this.voucher = data.voucher;
    this.totalValueCents = data.totalValueCents;
    this.sellerId = data.sellerId;
    this.seller = data.seller;
    this.events = data.events;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
