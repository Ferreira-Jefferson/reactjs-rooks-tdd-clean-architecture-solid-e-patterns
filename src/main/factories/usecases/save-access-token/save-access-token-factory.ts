
import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeSaveAccessToken = (): SaveAccessToken => {
  const localStorageAdapter = new LocalStorageAdapter()
  const saveAccessToken = new LocalSaveAccessToken(localStorageAdapter)
  return saveAccessToken
}
