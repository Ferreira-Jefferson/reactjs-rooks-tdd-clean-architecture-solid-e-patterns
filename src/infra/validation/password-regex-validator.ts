import { PasswordValidator, PasswordRules } from '@/validation/protocols'

export class PasswordRegexValidator implements PasswordValidator {
  private password: string
  validate (password: string, rules?: PasswordRules): boolean {
    if (!rules) {
      return true
    }
    this.password = password
    return this.min(rules.min)
  }

  private min (min: number): boolean {
    const regex = new RegExp(`^.{${min},}$`, 'gi')
    return regex.test(this.password)
  }
}
