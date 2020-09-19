import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '@/main/factories'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  const localSaveAccessToken = new LocalSaveAccessToken(makeLocalStorageAdapter())
  return localSaveAccessToken
}
