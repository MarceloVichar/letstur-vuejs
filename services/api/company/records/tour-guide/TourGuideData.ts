import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {TourGuideType} from '~/services/api/company/records/tour-guide/TourGuideType';

export class TourGuideData {
  id: number;
  name: string;
  document: string;
  phone?: string;
  email?: string;
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: TourGuideType) {
    this.id = data.id;
    this.name = data.name;
    this.document = data.document;
    this.phone = data.phone;
    this.email = data.email;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
