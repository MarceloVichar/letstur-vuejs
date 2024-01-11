import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export interface UserType {
  id: number;
  name: string;
  email: string;
  roles?: string[];
  permissions?: string[];
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;
}
