import {BaseService} from '~/services/api/shared/base/BaseService';
import type {TourType} from '~/services/api/company/records/tour/TourType';
import {TourData} from '~/services/api/company/records/tour/TourData';

export default class TourService extends BaseService<TourType> {

  constructor() {
    super({url: '/api/company/tours', data: TourData});
  }
}
