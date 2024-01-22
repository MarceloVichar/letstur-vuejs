import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {TourTypeType} from '~/services/api/company/records/tour-type/TourTypeType';

export class TourTypeData {
  id: number;
  name: string;
  color?: string;
  isExclusive: boolean;
  isTransfer?: boolean;
  companyId?: number;
  company?: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: TourTypeType) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.isExclusive = data.isExclusive;
    this.isTransfer = data.isTransfer;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
