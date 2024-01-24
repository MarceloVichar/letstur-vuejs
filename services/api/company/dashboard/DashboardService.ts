import {BaseService} from '~/services/api/shared/base/BaseService';
import {EventInfoData, SaleInfoData} from '~/services/api/company/dashboard/DashboardData';

export default class DashboardService extends BaseService<any> {
  constructor() {
    super({except: ['update', 'create', 'destroy', 'get', 'index']})
  }

  async getEventsInfos(params: any = {}): Promise<EventInfoData> {
    const events = await this.fetch.get('/api/company/dashboard/events', {params})
    return new EventInfoData(events)
  }

  async getSalesInfos(params: any = {}): Promise<SaleInfoData> {
    const sales = await this.fetch.get('/api/company/dashboard/sales', {params})
    return new SaleInfoData(sales)
  }
}
