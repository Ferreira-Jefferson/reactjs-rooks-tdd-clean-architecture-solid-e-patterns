import { RenderResult, fireEvent } from '@testing-library/react'
import { AddAccountParams } from '@/domain/usecases'
import { Helper } from '@/presentation/test'
import faker from 'faker'

export const fakeSignUpSubmit = (sut: RenderResult): AddAccountParams => {
  const defaultPassword = faker.internet.password()
  const account: AddAccountParams = ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: defaultPassword,
    passwordConfirmation: defaultPassword
  })
  Object.entries(account).forEach(([field, value]) => {
    Helper.fakerField(sut, field, value)
    Helper.testStatusFieldSuccess(sut, field)
  })
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  return account
}
