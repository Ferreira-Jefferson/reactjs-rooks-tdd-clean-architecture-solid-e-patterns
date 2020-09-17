import { ValidationComposite } from './validation-composite'
import { FieldValidationStub } from '@/validation/test/stub-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationStub: FieldValidationStub[]
}

const makeSut = (): SutTypes => {
  const fieldValidationStub = [
    new FieldValidationStub('any_field'),
    new FieldValidationStub('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationStub)
  return {
    sut,
    fieldValidationStub
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidationStub } = makeSut()
    const errorField = new Error('any_error_message')
    jest.spyOn(fieldValidationStub[1], 'validate').mockReturnValueOnce(errorField)
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe(errorField.message)
  })

  it('should return the first error if more than one validation fails', () => {
    const { sut, fieldValidationStub } = makeSut()
    const firstError = new Error('first_error_message')
    jest.spyOn(fieldValidationStub[0], 'validate').mockReturnValueOnce(firstError)
    jest.spyOn(fieldValidationStub[1], 'validate').mockReturnValueOnce(new Error('second_error_message'))
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe(firstError.message)
  })

  it('should return falsy if validation not fails', () => {
    const { sut } = makeSut()
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBeFalsy()
  })
})
