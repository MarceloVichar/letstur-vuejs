import {BaseService} from '~/services/api/shared/base/BaseService';
import type {LocaleType} from '~/services/api/company/records/locale/LocaleType';
import {LocaleData} from '~/services/api/company/records/locale/LocaleData';

export default class LocaleService extends BaseService<LocaleType> {

  constructor() {
    super({url: '/api/company/locales', data: LocaleData});
  }
}
