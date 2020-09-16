import { EmailValidator } from '@/validation/protocols'

export const stubEmailRegexValidator = (): EmailValidator => {
  class EmailRegexValidator implements EmailValidator {
    validate (email: string): boolean {
      return true
    }
  }
  return new EmailRegexValidator()
}
