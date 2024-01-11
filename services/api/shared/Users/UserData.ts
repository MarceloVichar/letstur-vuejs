import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {UserType} from '~/services/api/shared/Users/UserType';

export class UserData {
  id: number;
  name: string;
  email: string;
  roles?: string[];
  permissions?: string[];
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: UserType) {
    this.id = data?.id;
    this.name = data?.name;
    this.email = data?.email;
    this.roles = data?.roles;
    this.permissions = data?.permissions;
    this.companyId = data?.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
