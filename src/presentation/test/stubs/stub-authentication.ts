import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { fakeAccountModel } from '@/domain/test'

export const stubAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (params: AuthenticationParams): Promise<AccountModel> {
      return await Promise.resolve(fakeAccountModel())
    }
  }
  return new AuthenticationStub()
}
