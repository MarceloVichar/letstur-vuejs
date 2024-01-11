import {BaseService} from '~/services/api/shared/base/BaseService';
import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import {CompanyData} from '~/services/api/shared/company/CompanyData';

export default class CompanyService extends BaseService<CompanyType> {

  constructor() {
    super({url: '/api/admin/companies', data: CompanyData});
  }
}
