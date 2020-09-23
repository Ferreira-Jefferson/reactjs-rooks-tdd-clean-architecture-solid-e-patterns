import { ValidationComposite } from './validation-composite'
import { FieldValidationStub } from '@/validation/test/stub-field-validation'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationStub: FieldValidationStub[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationStub = [
    new FieldValidationStub(fieldName),
    new FieldValidationStub(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationStub)
  return {
    sut,
    fieldValidationStub
  }
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationStub } = makeSut(fieldName)
    const errorField = new Error(faker.random.words())
    jest.spyOn(fieldValidationStub[1], 'validate').mockReturnValueOnce(errorField)
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })
    expect(error).toBe(errorField.message)
  })

  it('should return the first error if more than one validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationStub } = makeSut(fieldName)
    const firstError = new Error(faker.random.words())
    jest.spyOn(fieldValidationStub[0], 'validate').mockReturnValueOnce(firstError)
    jest.spyOn(fieldValidationStub[1], 'validate').mockReturnValueOnce(new Error(faker.random.words()))
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })
    expect(error).toBe(firstError.message)
  })

  it('should return falsy if validation not fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
