import type {RequestType} from '~/services/api/shared/base/RequestType';
import {BaseService} from '~/services/api/shared/base/BaseService';

export default class AuthService extends BaseService<any> {
  constructor() {
    super({except: ['update', 'create', 'destroy', 'get', 'index']})
  }

  async login(data: any = {}): Promise<RequestType<any>> {
    console.log('aqui')
    return await this.fetch.post('/api/login', data)
  }

  async logout(): Promise<RequestType<any>> {
    return this.fetch.post('/api/logout')
  }

  async getProfile(): Promise<RequestType<any>> {
    return this.fetch.get('/api/me')
  }

  async updateProfile(data: any = {}): Promise<RequestType<any>> {
    return this.fetch.put('/api/me', data)
  }
}
