import { makeAxios, makeApiUrl } from '@/main/factories'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'

export const makeRemoteAddAccount = (): RemoteAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxios())
}
