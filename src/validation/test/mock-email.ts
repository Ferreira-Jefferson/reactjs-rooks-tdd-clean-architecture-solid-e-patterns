import { EmailValidator } from '@/validation/protocols'
import { EmailRegexValidator } from '@/infra/validation/email-regex-validator'

export const mockEmailRegexValidator = (): EmailValidator => {
  const mockEmailRegexValidator = new EmailRegexValidator()
  return mockEmailRegexValidator
}
