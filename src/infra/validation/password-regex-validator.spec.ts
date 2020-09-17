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
    it('should rules.upper is passed, return false if the password is not have some uppercase letter', () => {
      const sut = makeSut()
      const lower = faker.random.word().toLowerCase()
      const isValid = sut.validate(lower, { upper: true })
      expect(isValid).toBe(false)
    })

    it('should rules.upper is passed, return true if the password is have some uppercase letter', () => {
      const sut = makeSut()
      const UPPER = faker.random.word().toUpperCase()
      let isValid = sut.validate(UPPER, { upper: true })
      expect(isValid).toBe(true)
      const MixeD = UPPER + faker.random.word().toLowerCase()
      isValid = sut.validate(MixeD, { upper: true })
      expect(isValid).toBe(true)
    })
  })

  describe('lower()', () => {
    it('should rules.lower is passed, return false if the password is not have some lowercase letter', () => {
      const sut = makeSut()
      const UPPER = faker.random.word().toUpperCase()
      const isValid = sut.validate(UPPER, { lower: true })
      expect(isValid).toBe(false)
    })

    it('should rules.lower is passed, return true if the password is have some lowercase letter', () => {
      const sut = makeSut()
      const lower = faker.random.word().toLowerCase()
      let isValid = sut.validate(lower, { lower: true })
      expect(isValid).toBe(true)
      const MixeD = lower + faker.random.word().toUpperCase()
      isValid = sut.validate(MixeD, { lower: true })
      expect(isValid).toBe(true)
    })
  })

  describe('digits()', () => {
    it('should rules.digits is passed, return false if the password is not have some digits', () => {
      const sut = makeSut()
      const noDigit = faker.random.word()
      const isValid = sut.validate(noDigit, { digits: true })
      expect(isValid).toBe(false)
    })

    it('should rules.digits is passed, return true if the password is have some digits', () => {
      const sut = makeSut()
      const onlyDigits = faker.random.number().toString()
      let isValid = sut.validate(onlyDigits, { digits: true })
      expect(isValid).toBe(true)
      const M1x3d = onlyDigits + faker.random.word()
      isValid = sut.validate(M1x3d, { digits: true })
      expect(isValid).toBe(true)
    })
  })

  describe('space()', () => {
    it('should rules.space is passed, return false if the password is not have some space or tab', () => {
      const sut = makeSut()
      const noSpace = faker.random.word()
      const isValid = sut.validate(noSpace, { space: true })
      expect(isValid).toBe(false)
    })

    it('should rules.space is passed, return true if the password is have some space or tab', () => {
      const sut = makeSut()
      const spaceAndTab = ` \t ${faker.random.words()}\t\t `
      const isValid = sut.validate(spaceAndTab, { space: true })
      expect(isValid).toBe(true)
    })
  })

  describe('symbols()', () => {
    it('should rules.symbols is passed, return false if the password is not have some symbols', () => {
      const sut = makeSut()
      const nosymbols = faker.random.word()
      const isValid = sut.validate(nosymbols, { symbols: true })
      expect(isValid).toBe(false)
    })

    it('should rules.symbols is passed, return true if the password is have some symbols', () => {
      const sut = makeSut()
      const isValid = sut.validate('(#fs$12@&D*)', { symbols: true })
      expect(isValid).toBe(true)
    })
  })
})
