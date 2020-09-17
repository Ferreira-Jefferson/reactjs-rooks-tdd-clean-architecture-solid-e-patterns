import { PasswordRegexValidator } from './password-regex-validator'
import faker from 'faker'

const makeSut = (): PasswordRegexValidator => new PasswordRegexValidator()

describe('PasswordRegexValidator', () => {
  it('should return true if no rules are passed', () => {
    const sut = makeSut()
    const isValid = sut.validate(faker.random.word())
    expect(isValid).toBe(true)
  })

  describe('min()', () => {
    const min = 5
    it('should rules.min is passed, must return false if the password is less than rules.min', () => {
      const sut = makeSut()
      const isValid = sut.validate(faker.random.alphaNumeric(min - 1), { min })
      expect(isValid).toBe(false)
    })

    it('should rules.min is passed, it should return true if the password is >= that rules.min', () => {
      const sut = makeSut()
      const isValidEqual = sut.validate(faker.random.alphaNumeric(min), { min })
      expect(isValidEqual).toBe(true)
      const isValidBigger = sut.validate(faker.random.alphaNumeric(min + 1), { min })
      expect(isValidBigger).toBe(true)
    })
  })

  describe('max()', () => {
    const max = 5
    it('should rules.max is passed, must return false if the password is more than rules.max', () => {
      const sut = makeSut()
      const isValid = sut.validate(faker.random.alphaNumeric(max + 1), { max })
      expect(isValid).toBe(false)
    })

    it('should rules.max is passed, it should return true if the password is <= that rules.max', () => {
      const sut = makeSut()
      const isValidEqual = sut.validate(faker.random.alphaNumeric(max), { max })
      expect(isValidEqual).toBe(true)
      const isValidBigger = sut.validate(faker.random.alphaNumeric(max - 1), { max })
      expect(isValidBigger).toBe(true)
    })
  })

  describe('upper()', () => {
    it('should rules.upper is passed, return false if the password is not have some capitalized letter', () => {
      const sut = makeSut()
      const lower = faker.random.word().toLowerCase()
      const isValid = sut.validate(lower, { upper: true })
      expect(isValid).toBe(false)
    })

    it('should rules.upper is passed, return true if the password is have some capitalized letter', () => {
      const sut = makeSut()
      const UPPER = faker.random.word().toUpperCase()
      let isValid = sut.validate(UPPER, { upper: true })
      expect(isValid).toBe(true)
      const MixeD = UPPER + faker.random.word().toLowerCase()
      isValid = sut.validate(MixeD, { upper: true })
      expect(isValid).toBe(true)
    })
  })
})
