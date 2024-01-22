import AxiosClient from '~/infra/http/AxiosClient';
import {apiAxiosInstance} from '~/support/http-client-instances/api-axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const apiHttpClient = new AxiosClient(apiAxiosInstance(config?.public?.apiBaseUrl))

  nuxtApp.provide('apiHttpClient', apiHttpClient)
});
