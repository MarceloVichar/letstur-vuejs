import {BaseService} from '~/services/api/shared/base/BaseService';
import {DriverData} from '~/services/api/company/records/driver/DriverData';
import type {DriverType} from '~/services/api/company/records/driver/DriverType';

export default class DriverService extends BaseService<DriverType> {

  constructor() {
    super({url: '/api/company/drivers', data: DriverData});
  }
}
