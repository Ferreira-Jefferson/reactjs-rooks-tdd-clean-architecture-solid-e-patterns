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
    if (rules.upper) {
      results.push(this.upper())
    }
    if (rules.lower) {
      results.push(this.lower())
    }
    if (rules.digits) {
      results.push(this.digits())
    }
    if (rules.space) {
      results.push(this.space())
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

  private upper (): boolean {
    const regex = new RegExp('(?=.*[A-Z])', 'g')
    return regex.test(this.password)
  }

  private lower (): boolean {
    const regex = new RegExp('(?=.*[a-z])', 'g')
    return regex.test(this.password)
  }

  private digits (): boolean {
    const regex = new RegExp('(?=.*[0-9])', 'g')
    return regex.test(this.password)
  }

  private space (): boolean {
    const regex = new RegExp('(?=.*[ \\t])', 'g')
    return regex.test(this.password)
  }
}
