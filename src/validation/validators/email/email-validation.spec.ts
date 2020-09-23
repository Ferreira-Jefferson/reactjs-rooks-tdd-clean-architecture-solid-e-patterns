import { EmailValidation } from './email-validation'
import { EmailValidator } from '@/validation/protocols'
import { mockEmailRegexValidator } from '@/validation/test/mock-email'
import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'

type SutTypes = {
  sut: EmailValidation
  emailRegexValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailRegexValidatorStub = mockEmailRegexValidator()
  const sut = new EmailValidation(emailRegexValidatorStub, 'email')
  return {
    sut,
    emailRegexValidatorStub
  }
}

describe('EmailValidation', () => {
  it('should call EmailValidator with correct value', () => {
    const { sut, emailRegexValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(emailRegexValidatorStub, 'validate')
    const email = faker.internet.email()
    sut.validate({ email })
    expect(validateSpy).toBeCalledWith(email)
  })

  it('should return error if email is invalid', () => {
    const { sut, emailRegexValidatorStub } = makeSut()
    jest.spyOn(emailRegexValidatorStub, 'validate').mockReturnValue(false)
    const error = sut.validate({ email: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return falsy if email is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: '  ' })
    expect(error).toBeFalsy()
  })

  it('should return falsy if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: faker.internet.email() })
    expect(error).toBeFalsy()
  })
})
