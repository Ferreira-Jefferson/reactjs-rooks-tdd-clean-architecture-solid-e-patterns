import { EmailValidator } from '@/validation/protocols/email-validator'

export class EmailRegexValidator implements EmailValidator {
  private readonly regex: RegExp

  constructor () {
    this.regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i
  }

  validate (email: string): boolean {
    return this.regex.test(email)
  }
}
