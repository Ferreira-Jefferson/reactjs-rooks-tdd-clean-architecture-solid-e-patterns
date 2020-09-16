import { PasswordValidator, PasswordRules } from '@/validation/protocols'

export class PasswordRegexValidator implements PasswordValidator {
  validate (password: string, opts?: PasswordRules): boolean {
    return !opts
  }
}
