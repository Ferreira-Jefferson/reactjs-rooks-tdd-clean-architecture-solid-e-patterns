import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationStub implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return null
  }
}
