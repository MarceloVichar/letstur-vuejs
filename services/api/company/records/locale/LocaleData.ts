import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {LocaleType} from '~/services/api/company/records/locale/LocaleType';

export class LocaleData {
  id: number;
  name: string;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  uf?: string;
  responsibleName?: string;
  responsiblePhone?: string;
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: LocaleType) {
    this.id = data.id;
    this.name = data.name;
    this.zipCode = data.zipCode;
    this.street = data.street;
    this.number = data.number;
    this.complement = data.complement;
    this.district = data.district;
    this.city = data.city;
    this.uf = data.uf;
    this.responsibleName = data.responsibleName;
    this.responsiblePhone = data.responsiblePhone;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
