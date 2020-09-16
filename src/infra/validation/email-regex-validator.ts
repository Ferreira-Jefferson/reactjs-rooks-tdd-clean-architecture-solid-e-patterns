import { EmailValidator } from '@/validation/protocols/email-validator'

export class EmailRegexValidator implements EmailValidator {
  validate (email: string): boolean {
    const regex = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i
    return regex.test(email)
  }
}
