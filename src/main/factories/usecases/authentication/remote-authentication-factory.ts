import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxios, makeApiUrl } from '@/main/factories'

export const makeRemoteAuthentication = (): Authentication => {
  const { login } = makeApiUrl()
  const remoteAuthentication = new RemoteAuthentication(login, makeAxios())
  return remoteAuthentication
}
