import {BaseService} from '~/services/api/shared/base/BaseService';
import type {TourTypeType} from '~/services/api/company/records/tour-type/TourTypeType';
import {TourTypeData} from '~/services/api/company/records/tour-type/TourTypeData';

export default class TourTypeService extends BaseService<TourTypeType> {

  constructor() {
    super({url: '/api/company/tour-types', data: TourTypeData});
  }
}
