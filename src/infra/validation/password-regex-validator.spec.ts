import { PasswordRegexValidator } from './password-regex-validator'
import { PasswordRules } from '@/validation/protocols'
import faker from 'faker'

const makeSut = (rules?: PasswordRules): PasswordRegexValidator => new PasswordRegexValidator(rules)

describe('PasswordRegexValidator', () => {
  it('should return true if no rules are passed', () => {
    const sut = makeSut()
    const isValid = sut.validate(faker.random.word())
    expect(isValid).toBe(true)
  })

  describe('min()', () => {
    const min = 5
    it('should rules.min is passed, must return false if the password is less than rules.min', () => {
      const sut = makeSut({ min })
      const isValid = sut.validate(faker.random.alphaNumeric(min - 1))
      expect(isValid).toBe(false)
    })

    it('should rules.min is passed, it should return true if the password is >= that rules.min', () => {
      const sut = makeSut({ min })
      const isValidEqual = sut.validate(faker.random.alphaNumeric(min))
      expect(isValidEqual).toBe(true)
      const isValidBigger = sut.validate(faker.random.alphaNumeric(min + 1))
      expect(isValidBigger).toBe(true)
    })
  })

  describe('max()', () => {
    const max = 5
    it('should rules.max is passed, must return false if the password is more than rules.max', () => {
      const sut = makeSut({ max })
      const isValid = sut.validate(faker.random.alphaNumeric(max + 1))
      expect(isValid).toBe(false)
    })

    it('should rules.max is passed, it should return true if the password is <= that rules.max', () => {
      const sut = makeSut()
      const isValidEqual = sut.validate(faker.random.alphaNumeric(max))
      expect(isValidEqual).toBe(true)
      const isValidBigger = sut.validate(faker.random.alphaNumeric(max - 1))
      expect(isValidBigger).toBe(true)
    })
  })

  describe('upper()', () => {
    it('should rules.upper is passed, return false if the password is not have some uppercase letter', () => {
      const sut = makeSut({ upper: true })
      const lower = faker.random.word().toLowerCase()
      const isValid = sut.validate(lower)
      expect(isValid).toBe(false)
    })

    it('should rules.upper is passed, return true if the password is have some uppercase letter', () => {
      const sut = makeSut()
      const UPPER = faker.random.word().toUpperCase()
      let isValid = sut.validate(UPPER)
      expect(isValid).toBe(true)
      const MixeD = UPPER + faker.random.word().toLowerCase()
      isValid = sut.validate(MixeD)
      expect(isValid).toBe(true)
    })
  })

  describe('lower()', () => {
    it('should rules.lower is passed, return false if the password is not have some lowercase letter', () => {
      const sut = makeSut({ lower: true })
      const UPPER = faker.random.word().toUpperCase()
      const isValid = sut.validate(UPPER)
      expect(isValid).toBe(false)
    })

    it('should rules.lower is passed, return true if the password is have some lowercase letter', () => {
      const sut = makeSut()
      const lower = faker.random.word().toLowerCase()
      let isValid = sut.validate(lower)
      expect(isValid).toBe(true)
      const MixeD = lower + faker.random.word().toUpperCase()
      isValid = sut.validate(MixeD)
      expect(isValid).toBe(true)
    })
  })

  describe('digits()', () => {
    it('should rules.digits is passed, return false if the password is not have some digits', () => {
      const sut = makeSut({ digits: true })
      const noDigit = 'abcdABCD!@#$'
      const isValid = sut.validate(noDigit)
      expect(isValid).toBe(false)
    })

    it('should rules.digits is passed, return true if the password is have some digits', () => {
      const sut = makeSut()
      const onlyDigits = faker.random.number().toString()
      let isValid = sut.validate(onlyDigits)
      expect(isValid).toBe(true)
      const M1x3d = onlyDigits + faker.random.word()
      isValid = sut.validate(M1x3d)
      expect(isValid).toBe(true)
    })
  })

  describe('space()', () => {
    it('should rules.space is passed, return false if the password is not have some space or tab', () => {
      const sut = makeSut({ space: true })
      const noSpace = faker.random.word()
      const isValid = sut.validate(noSpace)
      expect(isValid).toBe(false)
    })

    it('should rules.space is passed, return true if the password is have some space or tab', () => {
      const sut = makeSut()
      const spaceAndTab = ` \t ${faker.random.words()}\t\t `
      const isValid = sut.validate(spaceAndTab)
      expect(isValid).toBe(true)
    })
  })

  describe('symbols()', () => {
    it('should rules.symbols is passed, return false if the password is not have some symbols', () => {
      const sut = makeSut({ symbols: true })
      const nosymbols = faker.random.number().toString()
      const isValid = sut.validate(nosymbols)
      expect(isValid).toBe(false)
    })

    it('should rules.symbols is passed, return true if the password is have some symbols', () => {
      const sut = makeSut()
      const isValid = sut.validate('(#fs$12@&D*)')
      expect(isValid).toBe(true)
    })
  })

  describe('blackList()', () => {
    it('should rules.blackList is passed without value in the array it should return true', () => {
      const sut = makeSut({ blackList: [] })
      const noblackList = faker.internet.password()
      const isValid = sut.validate(noblackList)
      expect(isValid).toBe(true)
    })

    it('should rules.blackList is passed and the password is in the blacklist it must return false', () => {
      const password = faker.internet.password()
      const sut = makeSut({ blackList: [password] })
      const isValid = sut.validate(password)
      expect(isValid).toBe(false)
    })

    it('should rules.blackList is passed and the password is not in the blackList it must return true', () => {
      const password = faker.internet.password()
      const passwordForbidden = password + faker.internet.password()
      const sut = makeSut({ blackList: [passwordForbidden] })
      const isValid = sut.validate(password)
      expect(isValid).toBe(true)
    })
  })
})
