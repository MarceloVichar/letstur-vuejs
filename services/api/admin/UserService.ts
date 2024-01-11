import {BaseService} from '~/services/api/shared/base/BaseService';
import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import {UserData} from '~/services/api/shared/Users/UserData';

export default class UserService extends BaseService<CompanyType> {

  constructor() {
    super({url: '/api/admin/users', data: UserData});
  }
}
