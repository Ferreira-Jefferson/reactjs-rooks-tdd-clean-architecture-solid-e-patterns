import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

type LoginModel = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
  submitButton: HTMLButtonElement
}

export const fakeLoginModel = (sut: RenderResult): LoginModel => {
  const emailInput = fakeEmail(sut, faker.internet.email())
  const passwordInput = fakePassword(sut, faker.internet.password())
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  return {
    emailInput,
    passwordInput,
    submitButton
  }
}

export const fakeEmail = (sut: RenderResult, email = faker.internet.email()): HTMLInputElement => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, { target: { value: email } })
  fireEvent.blur(emailInput)
  return emailInput
}

export const fakePassword = (sut: RenderResult, password = faker.internet.password()): HTMLInputElement => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: password } })
  fireEvent.blur(passwordInput)
  return passwordInput
}
