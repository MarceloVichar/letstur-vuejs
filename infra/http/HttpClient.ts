/* eslint-disable no-unused-vars */

export default interface HttpClient {
  instance: any;

  request<T>(options: object): Promise<T>;
  get<T>(url: string, options: object): Promise<T>;
  post<T>(url: string, data: any, options: object): Promise<T>;
  put<T>(url: string, data: any, options: object): Promise<T>;
  patch<T>(url: string, data: any, options: object): Promise<T>;
  delete<T>(url: string, options: object): Promise<T>;
}
