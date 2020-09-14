import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

type LoginModel = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
}

export const fakeLoginModel = (sut: RenderResult): LoginModel => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
  fireEvent.blur(emailInput)
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
  fireEvent.blur(passwordInput)
  return {
    emailInput,
    passwordInput
  }
}
