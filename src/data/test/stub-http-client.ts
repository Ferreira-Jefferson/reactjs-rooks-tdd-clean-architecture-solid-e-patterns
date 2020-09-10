import { HttpPostClient } from '@/data/protocols/http/http-post-client'

export class HttpPostClientStub implements HttpPostClient {
  url?: string
  async post (url: string): Promise<void> {
    this.url = url
    return await Promise.resolve()
  }
}
