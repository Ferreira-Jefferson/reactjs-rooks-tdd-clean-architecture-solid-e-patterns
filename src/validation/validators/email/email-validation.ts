
import { FieldValidation, EmailValidator } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (
    private readonly emailValidator: EmailValidator,
    readonly field: string
  ) { }

  validate (input: Record<string, any>): Error {
    const isValid = this.emailValidator.validate(input[this.field])
    return isValid ? null : new InvalidFieldError()
  }
}
