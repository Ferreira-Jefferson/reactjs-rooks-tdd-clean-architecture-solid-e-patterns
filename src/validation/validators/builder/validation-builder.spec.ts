import { ValidationBuilder as sut, RequiredFieldValidation, EmailValidation, PasswordValidation, CompareFieldsValidation } from '@/validation/validators'
import { mockEmailRegexValidator, stubPasswordRegexValidator } from '@/validation/test'
import faker from 'faker'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email(mockEmailRegexValidator()).build()
    expect(validations).toEqual([new EmailValidation(mockEmailRegexValidator(), field)])
  })

  it('should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  it('should return PasswordValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).password(stubPasswordRegexValidator()).build()
    expect(validations).toEqual([new PasswordValidation(stubPasswordRegexValidator(), field)])
  })

  it('should return a list of validations', () => {
    const field = faker.database.column()
    const validations = sut.field(field)
      .email(mockEmailRegexValidator())
      .password(stubPasswordRegexValidator())
      .required()
      .build()
    expect(validations).toEqual([
      new EmailValidation(mockEmailRegexValidator(), field),
      new PasswordValidation(stubPasswordRegexValidator(), field),
      new RequiredFieldValidation(field)
    ])
  })
})
