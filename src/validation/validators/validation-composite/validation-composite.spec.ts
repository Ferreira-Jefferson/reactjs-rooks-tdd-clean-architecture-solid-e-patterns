import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test/spy-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationSpy)
  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationSpy } = makeSut()
    const errorField = new Error('any_error_message')
    fieldValidationSpy[1].error = errorField
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe(errorField.message)
  })

  it('should return the first error if more than one validation fails', () => {
    const { sut, fieldValidationSpy } = makeSut()
    const firstError = new Error('first_error_message')
    fieldValidationSpy[0].error = firstError
    fieldValidationSpy[1].error = new Error('second_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe(firstError.message)
  })
})
