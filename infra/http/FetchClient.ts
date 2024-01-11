// @ts-ignore
import HttpClient from '~/infra/http/HttpClient';

export default class FetchClient implements HttpClient{

  readonly instance: any;

  constructor(instance: any) {
    this.instance = instance
  }

  async request<T>(options: object): Promise<T> {
    return await this.instance(options)
  }

  async get<T>(url: string, options: object = {}): Promise<T> {
    return await this.instance(url, {...options, method: 'GET'})
  }

  async delete<T>(url: string, options: object = {}): Promise<T> {
    return await this.instance(url, {...options, method: 'DELETE'})
  }

  async patch<T>(url: string, data: object = {}, options: object = {}): Promise<T> {
    return await this.instance(url, {...options, body: data, method: 'PATCH'})
  }

  async post<T>(url: string, data: object = {}, options: object = {}): Promise<T> {
    return await this.instance(url, {...options, body: data, method: 'POST'})
  }

  async put<T>(url: string, data: object = {}, options: object = {}): Promise<T> {
    return await this.instance(url, {...options, body: data, method: 'PUT'})
  }
}
