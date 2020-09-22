import { RenderResult, fireEvent } from '@testing-library/react'
import { AddAccountParams } from '@/domain/usecases'
import { Helper } from '@/presentation/test'
import faker from 'faker'

export const fakeSignUpSubmit = (sut: RenderResult): AddAccountParams => {
  const name = faker.name.findName()
  const email = faker.internet.email()
  const password = faker.internet.password()
  const passwordConfirmation = password
  Helper.fakerField(sut, 'name', name)
  Helper.fakerField(sut, 'email', email)
  Helper.fakerField(sut, 'password', password)
  Helper.fakerField(sut, 'passwordConfirmation', passwordConfirmation)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  return {
    name,
    email,
    password,
    passwordConfirmation
  }
}
