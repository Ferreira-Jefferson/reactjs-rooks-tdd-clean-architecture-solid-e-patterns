import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'
import faker from 'faker'

export const stubAddAccount = (): AddAccount => {
  class AddAccount implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve({
        accessToken: faker.random.uuid()
      })
    }
  }
  return new AddAccount()
}
