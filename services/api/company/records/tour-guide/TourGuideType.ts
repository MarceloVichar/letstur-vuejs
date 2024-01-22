import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export interface TourGuideType {
  id: number;
  name: string;
  document: string;
  phone?: string;
  email?: string;
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;
}
