import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { RemoteAuthentication } from './remote-authentication'
import { fakeAuthentication, fakeAccountModel } from '@/domain/test'
import { HttpPostClientStub } from '@/data/test'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientStub: HttpPostClientStub<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = new HttpPostClientStub<AuthenticationParams, AccountModel>()
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
    await sut.auth(fakeAuthentication())
    expect(httpPostClientStub.url).toBe(url)
  })

  it('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientStub } = makeSut()
    const autheticationParams = fakeAuthentication()
    await sut.auth(autheticationParams)
    expect(httpPostClientStub.body).toEqual(autheticationParams)
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(fakeAuthentication())
    await expect(promise).rejects.toThrowError(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(fakeAuthentication())
    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(fakeAuthentication())
    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(fakeAuthentication())
    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  it('should returns an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientStub } = makeSut()
    const httpResult = fakeAccountModel()
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(fakeAuthentication())
    expect(account).toEqual(httpResult)
  })
})
