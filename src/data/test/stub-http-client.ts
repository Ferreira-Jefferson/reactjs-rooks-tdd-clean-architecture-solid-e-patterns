import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-response'

export class HttpPostClientStub<Req, Res> implements HttpPostClient<Req, Res> {
  url?: string
  body?: Req
  response: HttpResponse<Res> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<Req>): Promise<HttpResponse<Res>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
