import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const makeAxios = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
