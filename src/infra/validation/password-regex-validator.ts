import { PasswordValidator, PasswordOptions } from '@/validation/protocols'

export class PasswordRegexValidator implements PasswordValidator {
  validate (password: string, opts?: PasswordOptions): boolean {
    return !opts
  }
}
