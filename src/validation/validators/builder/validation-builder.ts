import { FieldValidation, EmailValidator } from '@/validation/protocols'
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (emailValidator: EmailValidator): ValidationBuilder {
    this.validations.push(new EmailValidation(emailValidator, this.fieldName))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
