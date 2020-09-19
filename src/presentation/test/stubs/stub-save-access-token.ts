import { SaveAccessToken } from '@/domain/usecases'

export const stubSaveAccessToken = (): SaveAccessToken => {
  class SaveAccessTokenStub implements SaveAccessToken {
    async save (accessToken: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new SaveAccessTokenStub()
}
