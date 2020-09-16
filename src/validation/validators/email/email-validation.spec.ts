import { EmailValidation } from './email-validation'
import { EmailValidator } from '@/validation/protocols'
import { stubEmailRegexValidator } from '@/validation/test/stub-email'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailRegexValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailRegexValidatorStub = stubEmailRegexValidator()
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
    sut.validate(email)
    expect(validateSpy).toBeCalledWith(email)
  })
})
