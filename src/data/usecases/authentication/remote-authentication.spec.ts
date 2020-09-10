import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientStub } from '@/data/test/stub-http-client'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientStub: HttpPostClientStub
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = new HttpPostClientStub()
  const sut = new RemoteAuthentication(url, httpPostClientStub)
  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = makeSut(url)
    await sut.auth()
    expect(httpPostClientStub.url).toBe(url)
  })
})
