import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientStub } from '@/data/test/stub-http-client'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientStub: HttpPostClientStub
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientStub = new HttpPostClientStub()
  const sut = new RemoteAuthentication(url, httpPostClientStub)
  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const { sut, httpPostClientStub } = makeSut(url)
    await sut.auth()
    expect(httpPostClientStub.url).toBe(url)
  })
})
