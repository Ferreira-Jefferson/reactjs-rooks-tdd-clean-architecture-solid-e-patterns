import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { EmailRegexValidator } from '@/infra/validation/email-regex-validator'
import { PasswordRegexValidator } from '@/infra/validation/password-regex-validator'
import { PasswordRules } from '@/validation/protocols'
import { makeLoginValidation } from '@/main/factories'

const fakeLoginValidationComposite = (): ValidationComposite => {
  const emailRegexValidator = new EmailRegexValidator()
  const rules: PasswordRules = { min: 5, max: 20, symbols: true }
  const passwordRegexValidator = new PasswordRegexValidator(rules)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email(emailRegexValidator).build(),
    ...ValidationBuilder.field('password').required().password(passwordRegexValidator).build()
  ])
  return validationComposite
}
describe('LoginValidationFactory', () => {
  it('should make ValidationComposite wit correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(fakeLoginValidationComposite())
  })
})
