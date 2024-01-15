import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export interface DriverType {
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
}
