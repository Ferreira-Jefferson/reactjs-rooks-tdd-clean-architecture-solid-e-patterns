import { HttpResponse } from '.'

export type HttpPostParams<Req> = {
  url: string
  body?: Req
}

export interface HttpPostClient<Req, Res> {
  post: (params: HttpPostParams<Req>) => Promise<HttpResponse<Res>>
}
