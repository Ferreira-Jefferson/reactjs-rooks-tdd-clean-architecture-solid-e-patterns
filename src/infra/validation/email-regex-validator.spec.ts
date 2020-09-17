import { EmailRegexValidator } from './email-regex-validator'
import faker from 'faker'
const makeSut = (): EmailRegexValidator => new EmailRegexValidator()

describe('EmailRegexValidator', () => {
  it('should return false if email is invalid', () => {
    const sut = makeSut()
    const isValid = sut.validate(faker.random.word())
    expect(isValid).toBe(false)
  })

  it('should return true if email is valid', () => {
    const sut = makeSut()
    const isValid = sut.validate(faker.internet.email())
    expect(isValid).toBe(true)
  })
})
