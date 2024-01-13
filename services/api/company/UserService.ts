import {BaseService} from '~/services/api/shared/base/BaseService';
import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import {UserData} from '~/services/api/shared/users/UserData';

export default class UserService extends BaseService<CompanyType> {

  constructor() {
    super({url: '/api/company/users', data: UserData});
  }
}
