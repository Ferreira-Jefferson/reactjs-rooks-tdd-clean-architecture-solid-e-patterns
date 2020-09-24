import { PasswordValidation } from './password-validation'
import { PasswordValidator } from '@/validation/protocols'
import { stubPasswordRegexValidator } from '@/validation/test/stub-password'
import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'

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
    sut.validate({ password })
    expect(validateSpy).toBeCalledWith(password)
  })

  it('should return an error if password is invalid', () => {
    const { sut, passwordRegexValidatorStub } = makeSut()
    jest.spyOn(passwordRegexValidatorStub, 'validate').mockReturnValue(false)
    const error = sut.validate({ password: 'invalid_password' })
    expect(error).toEqual(new InvalidFieldError('password'))
  })

  it('should return falsy if password is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate({ password: faker.internet.password() })
    expect(error).toBeFalsy()
  })
})
