import { PasswordRegexValidator } from '@/infra/validation/password-regex-validator'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { EmailRegexValidator } from '@/infra/validation/email-regex-validator'
import { PasswordRules } from '@/validation/protocols'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export const makeLoginValidation = (): ValidationComposite => {
  const emailRegexValidator = new EmailRegexValidator()
  const rules: PasswordRules = { min: 5, max: 20, symbols: true }
  const passwordRegexValidator = new PasswordRegexValidator(rules)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email(emailRegexValidator).build(),
    ...ValidationBuilder.field('password').required().password(passwordRegexValidator).build()
  ])
  return validationComposite
}
