import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {DriverType} from '~/services/api/company/records/driver/DriverType';

export class DriverData {
  id: number;
  name: string;
  cnh: string;
  cnhType: string;
  document: string;
  phone?: string;
  dateOfBirth?: string;
  email?: string;
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: DriverType) {
    this.id = data.id;
    this.name = data.name;
    this.cnh = data.cnh;
    this.cnhType = data.cnhType;
    this.document = data.document;
    this.phone = data.phone;
    this.dateOfBirth = data.dateOfBirth;
    this.email = data.email;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
