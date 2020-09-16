
import { FieldValidation, EmailValidator } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (
    private readonly emailValidator: EmailValidator,
    readonly field: string
  ) { }

  validate (value: string): Error {
    const isValid = this.emailValidator.validate(value)
    return isValid ? null : new InvalidFieldError(this.field)
  }
}
