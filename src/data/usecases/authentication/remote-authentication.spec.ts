import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientStub } from '@/data/test/stub-http-client'

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientStub = new HttpPostClientStub()
    const sut = new RemoteAuthentication(url, httpPostClientStub)
    await sut.auth()
    expect(httpPostClientStub.url).toBe(url)
  })
})
