import { ValidationBuilder as sut, RequiredFieldValidation, EmailValidation, PasswordValidation } from '@/validation/validators'
import { mockEmailRegexValidator, stubPasswordRegexValidator } from '@/validation/test'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  it('should return EmailValidation', () => {
    const validations = sut.field('any_field').email(mockEmailRegexValidator()).build()
    expect(validations).toEqual([new EmailValidation(mockEmailRegexValidator(), 'any_field')])
  })

  it('should return PasswordValidation', () => {
    const validations = sut.field('any_field').password(stubPasswordRegexValidator()).build()
    expect(validations).toEqual([new PasswordValidation(stubPasswordRegexValidator(), 'any_field')])
  })
})
