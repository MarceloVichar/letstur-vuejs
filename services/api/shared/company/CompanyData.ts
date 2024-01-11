import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export class CompanyData {
  id: number|string;
  name: string;
  tradingName: string;
  cnpj: string;
  ie?: string;
  phone: string;
  secondaryPhone?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: CompanyType) {
    this.id = data?.id || '';
    this.name = data?.name || '';
    this.tradingName = data?.tradingName || '';
    this.cnpj = data?.cnpj || '';
    this.ie = data?.ie || '';
    this.phone = data?.phone || '';
    this.secondaryPhone = data?.secondaryPhone || '';
    this.email = data?.email || '';
    this.createdAt = data?.createdAt || '';
    this.updatedAt = data?.updatedAt || '';
  }
}
