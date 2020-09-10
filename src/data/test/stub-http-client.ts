import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

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
