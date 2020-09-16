
import { FieldValidation, EmailValidator } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (
    private readonly emailValidator: EmailValidator,
    readonly field: string
  ) { }

  validate (value: string): Error {
    this.emailValidator.validate(value)
    return null
  }
}
