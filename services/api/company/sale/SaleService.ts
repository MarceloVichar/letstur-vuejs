import {BaseService} from '~/services/api/shared/base/BaseService';
import {SaleData} from '~/services/api/company/sale/SaleData';
import type {SaleType} from '~/services/api/company/sale/SaleType';

export default class SaleService extends BaseService<SaleType> {

  constructor() {
    super({url: '/api/company/sales', data: SaleData});
  }

  async confirmSale(id: number) {
    return await this.fetch.put(`${this.url}/${id}/confirm`);
  }
}
