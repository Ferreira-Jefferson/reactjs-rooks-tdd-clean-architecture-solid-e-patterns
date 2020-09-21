import { RenderResult, fireEvent } from '@testing-library/react'
import { Helper } from '@/presentation/test'

type LoginModel = {
  emailInput: HTMLInputElement
  passwordInput: HTMLInputElement
  submitButton: HTMLButtonElement
}

export const fakeLoginModel = (sut: RenderResult): LoginModel => {
  const emailInput = Helper.fakerField(sut, 'email') as HTMLInputElement
  const passwordInput = Helper.fakerField(sut, 'password') as HTMLInputElement
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  return {
    emailInput,
    passwordInput,
    submitButton
  }
}
