import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    class HttpPostClientStub implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostClientStub = new HttpPostClientStub()
    const sut = new RemoteAuthentication(url, httpPostClientStub)
    await sut.auth()
    expect(httpPostClientStub.url).toBe(url)
  })
})
