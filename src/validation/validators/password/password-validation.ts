
import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'
import { PasswordValidator } from '@/validation/protocols'

export class PasswordValidation implements FieldValidation {
  constructor (
    private readonly passwordValidator: PasswordValidator,
    readonly field: string
  ) { }

  validate (input: Record<string, any>): Error {
    return this.passwordValidator.validate(input[this.field]) ? null : new InvalidFieldError(this.field)
  }
}
