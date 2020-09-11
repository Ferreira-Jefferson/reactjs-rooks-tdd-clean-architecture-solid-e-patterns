import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

export const fakeAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const fakeAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})
