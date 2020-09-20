import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, faker.random.alphaNumeric())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(field))
  })

  it('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
