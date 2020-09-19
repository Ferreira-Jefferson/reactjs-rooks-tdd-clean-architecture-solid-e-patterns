import { PasswordValidator } from '@/validation/protocols'

export const stubPasswordRegexValidator = (): PasswordValidator => {
  class PasswordRegexValidator implements PasswordValidator {
    validate (password: string): boolean {
      return true
    }
  }
  return new PasswordRegexValidator()
}
