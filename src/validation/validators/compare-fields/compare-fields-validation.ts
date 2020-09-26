import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) { }

  validate (input: Record<string, any>): Error {
    return input[this.field] !== input[this.valueToCompare] ? new InvalidFieldError() : null
  }
}
