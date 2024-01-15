import {BaseService} from '~/services/api/shared/base/BaseService';
import type {TourGuideType} from '~/services/api/company/records/tour-guide/TourGuideType';
import {TourGuideData} from '~/services/api/company/records/tour-guide/TourGuideData';

export default class TourGuideService extends BaseService<TourGuideType> {

  constructor() {
    super({url: '/api/company/tour-guides', data: TourGuideData});
  }
}
