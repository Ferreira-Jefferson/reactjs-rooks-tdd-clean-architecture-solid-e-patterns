import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, fakeHttpResponse } from '@/infra/test'
import { fakePostRequest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>

}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = fakePostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toBeCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut()
    const promiseHttpResponse = sut.post(fakePostRequest())
    expect(promiseHttpResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })

  it('should return the correct statusCode and body on fails', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValue({
      response: fakeHttpResponse()
    })
    const promiseHttpResponse = sut.post(fakePostRequest())
    expect(promiseHttpResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
