import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { AddAccountParams } from '@/domain/usecases'
import { HttpPostClientStub } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { fakeAddAccountParams } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientStub: HttpPostClientStub<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = new HttpPostClientStub<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientStub)
  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAddAccount', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = makeSut(url)
    await sut.add(fakeAddAccountParams())
    expect(httpPostClientStub.url).toBe(url)
  })
})
