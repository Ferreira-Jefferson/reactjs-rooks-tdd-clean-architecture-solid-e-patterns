
import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'
import { PasswordValidator } from '@/validation/protocols'

export class PasswordValidation implements FieldValidation {
  constructor (
    private readonly passwordValidator: PasswordValidator,
    readonly field: string
  ) { }

  validate (value: string): Error {
    return this.passwordValidator.validate(value) ? null : new InvalidFieldError(this.field)
  }
}
