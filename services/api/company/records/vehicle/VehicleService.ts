import {BaseService} from '~/services/api/shared/base/BaseService';
import type {VehicleType} from '~/services/api/company/records/vehicle/VehicleType';
import {VehicleData} from '~/services/api/company/records/vehicle/VehicleData';

export default class VehicleService extends BaseService<VehicleType> {

  constructor() {
    super({url: '/api/company/vehicles', data: VehicleData});
  }
}
