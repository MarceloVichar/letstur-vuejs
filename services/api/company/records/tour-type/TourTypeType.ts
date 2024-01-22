import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export interface TourTypeType {
  id: number;
  name: string;
  color?: string;
  isExclusive: boolean;
  isTransfer?: boolean;
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;
}
