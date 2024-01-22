import type {RequestType} from '~/services/api/shared/base/RequestType';
import type {PaginationRequestType} from '~/services/api/shared/base/PaginationRequestType';
import type HttpClient from '~/infra/http/HttpClient';

type MethodNames = 'index' | 'get' | 'create' | 'update' | 'destroy';

export interface ServiceInterface {
  url?: string,
  data?: any,
  fetch?: HttpClient,
  except?: MethodNames[]
}

export abstract class BaseService<T> implements ServiceInterface{
  public fetch: any;
  public readonly url: string;
  public readonly data: any;
  public readonly except: MethodNames[];

  protected constructor(baseServiceProps?: ServiceInterface) {
    this.url = baseServiceProps?.url || '';
    this.data = baseServiceProps?.data || null
    this.except = baseServiceProps?.except || [];

    if (!baseServiceProps?.fetch) {
      this.setDefaultFetch()
    } else {
      this.fetch = baseServiceProps.fetch
    }
  }

  private setDefaultFetch() {
    const { $apiHttpClient } = useNuxtApp()
    this.fetch = $apiHttpClient
  }

  async index(params?: object): Promise<PaginationRequestType<T>> {
    if (this.except.includes('index')) {
      throw new Error('Index method not allowed');
    }

    const response = await this.fetch.get(this.url, {params})
    return {
      meta: response?.meta,
      data: this.data
        ? response?.data.map((item: any) => new this.data(item))
        : response?.data
      ,
    }
  }

  async get(id: number|string, options: any = {}): Promise<RequestType<T>> {
    if (this.except.includes('get')) {
      throw new Error('Get method not allowed');
    }

    const response = await this.fetch.get(`${this.url}/${id}`, options)
    return { item: this.data
      ? new this.data(response)
      : response,
    }
  }

  async create(data: any): Promise<RequestType<any>> {
    if (this.except.includes('create')) {
      throw new Error('Create method not allowed');
    }

    const response =  await this.fetch.post(this.url, data)
    return { item: this.data
      ? new this.data(response)
      : response,
    }
  }

  async update(id: number|string, data: any): Promise<RequestType<any>> {
    if (this.except.includes('update')) {
      throw new Error('Update method not allowed');
    }

    const url = `${this.url}/${id}`
    const response = await this.fetch.put(url, data)
    return { item: this.data
      ? new this.data(response)
      : response,
    }
  }

  async destroy(id: number|string): Promise<any> {
    if (this.except.includes('destroy')) {
      throw new Error('Destroy method not allowed');
    }

    return await this.fetch.delete(`${this.url}/${id}`);
  }
}
