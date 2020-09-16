import { PasswordValidator, PasswordRules } from '@/validation/protocols'

export class PasswordRegexValidator implements PasswordValidator {
  private password: string
  validate (password: string, rules?: PasswordRules): boolean {
    if (!rules) {
      return true
    }
    this.password = password
    const results = []
    if (rules.min) {
      results.push(this.min(rules.min))
    }
    if (rules.max) {
      results.push(this.max(rules.max))
    }
    return !results.includes(false)
  }

  private min (min: number): boolean {
    const regex = new RegExp(`^.{${min},}$`, 'gi')
    return regex.test(this.password)
  }

  private max (max: number): boolean {
    const regex = new RegExp(`^.{0,${max}}$`, 'gi')
    return regex.test(this.password)
  }
}
