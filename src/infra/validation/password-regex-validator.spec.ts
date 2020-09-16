import { PasswordRegexValidator } from './password-regex-validator'
import faker from 'faker'

const makeSut = (): PasswordRegexValidator => new PasswordRegexValidator()

describe('PasswordRegexValidator', () => {
  it('should return true if no options are passed', () => {
    const sut = makeSut()
    const isValid = sut.validate(faker.random.word())
    expect(isValid).toBe(true)
  })
})
