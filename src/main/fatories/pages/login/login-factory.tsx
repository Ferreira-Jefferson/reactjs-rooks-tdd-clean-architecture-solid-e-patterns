import React from 'react'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { EmailRegexValidator } from '@/infra/validation/email-regex-validator'
import { PasswordRegexValidator } from '@/infra/validation/password-regex-validator'
import { PasswordRules } from '@/validation/protocols'

export const makeLogin: React.FC = () => {
  const url = 'https://api-clean-node.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const emailRegexValidator = new EmailRegexValidator()
  const rules: PasswordRules = { min: 5, max: 20, symbols: true }
  const passwordRegexValidator = new PasswordRegexValidator(rules)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email(emailRegexValidator).build(),
    ...ValidationBuilder.field('password').required().password(passwordRegexValidator).build()
  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
