import { PasswordValidator, PasswordRules } from '@/validation/protocols'

export class PasswordRegexValidator implements PasswordValidator {
  private password: string

  constructor (
    readonly rules?: PasswordRules
  ) {}

  validate (password: string): boolean {
    if (!this.rules) {
      return true
    }
    this.password = password
    const results = []
    if (this.rules.min) {
      results.push(this.min(this.rules.min))
    }
    if (this.rules.max) {
      results.push(this.max(this.rules.max))
    }
    if (this.rules.upper) {
      results.push(this.upper())
    }
    if (this.rules.lower) {
      results.push(this.lower())
    }
    if (this.rules.digits) {
      results.push(this.digits())
    }
    if (this.rules.space) {
      results.push(this.space())
    }
    if (this.rules.symbols) {
      results.push(this.symbols())
    }
    if (this.rules.blackList) {
      results.push(this.blackList(this.rules.blackList))
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

  private symbols (): boolean {
    const regex = new RegExp('(?=.*[-}{@!#$%&^+.,.^?~=+*_\\(\\)\\[\\]\\/\\|])', 'g')
    return regex.test(this.password)
  }

  private blackList (blackList: string[]): boolean {
    for (const passwordForbidden of blackList) {
      const regex = new RegExp(`^${passwordForbidden}$`, 'i')
      if (regex.test(this.password)) {
        return false
      }
    }
    return true
  }
}
