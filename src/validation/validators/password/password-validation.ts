
import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class PasswordValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) { }

  validate (value: string): Error {
    return new InvalidFieldError(this.field)
  }
}
