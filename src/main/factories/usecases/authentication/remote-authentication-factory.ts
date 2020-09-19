import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxios, makeApiUrl } from '@/main/factories'

export const makeRemoteAuthentication = (): Authentication => {
  const remoteAuthentication = new RemoteAuthentication(makeApiUrl('/login'), makeAxios())
  return remoteAuthentication
}
