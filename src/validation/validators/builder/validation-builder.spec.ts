import { ValidationBuilder as sut, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { mockEmailRegexValidator } from '@/validation/test/mock-email'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  it('should return EmailValidation ', () => {
    const validations = sut.field('any_field').email(mockEmailRegexValidator()).build()
    expect(validations).toEqual([new EmailValidation(mockEmailRegexValidator(), 'any_field')])
  })
})
