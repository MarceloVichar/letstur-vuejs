import {BaseService} from '~/services/api/shared/base/BaseService';
import {EventData} from '~/services/api/company/event/EventData';
import type {EventType} from '~/services/api/company/event/EventType';

export default class EventService extends BaseService<EventType> {

  constructor() {
    super({url: '/api/company/events', data: EventData});
  }
}
