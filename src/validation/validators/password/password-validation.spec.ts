import { PasswordValidation } from './password-validation'
import { PasswordValidator } from '@/validation/protocols'
import { stubPasswordRegexValidator } from '@/validation/test/stub-password'
import faker from 'faker'

type SutTypes = {
  sut: PasswordValidation
  passwordRegexValidatorStub: PasswordValidator
}

const makeSut = (): SutTypes => {
  const passwordRegexValidatorStub = stubPasswordRegexValidator()
  const sut = new PasswordValidation(passwordRegexValidatorStub, 'password')
  return {
    sut,
    passwordRegexValidatorStub
  }
}

describe('PasswordValidation', () => {
  it('should call PasswordValidator with correct value', () => {
    const { sut, passwordRegexValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(passwordRegexValidatorStub, 'validate')
    const password = faker.internet.password()
    sut.validate(password)
    expect(validateSpy).toBeCalledWith(password)
  })
})
