import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationStub implements FieldValidation {
  constructor (readonly field: string) {}
  validate (input: object): Error {
    return null
  }
}
