import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test/spy-field-validation'

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidationSpy1 = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    const sut = new ValidationComposite([fieldValidationSpy1, fieldValidationSpy2])
    const errorField = new Error('any_error_message')
    fieldValidationSpy2.error = errorField
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe(errorField.message)
  })
})
