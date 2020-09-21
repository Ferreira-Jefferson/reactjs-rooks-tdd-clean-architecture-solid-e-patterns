import { RenderResult, waitFor, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const fakerField = (sut: RenderResult, fieldName: string, value: string = faker.random.alphaNumeric()): HTMLElement => {
  const element = sut.getByTestId(fieldName)
  fireEvent.input(element, { target: { value: value } })
  return element
}

export const testChildCount = (sut: RenderResult, fieldTestId: string, count: number): void => {
  const element = sut.getByTestId(fieldTestId)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldTestId: string, isDisabled: boolean): void => {
  const element = sut.getByTestId(fieldTestId) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

export const testStatusFieldFails = (sut: RenderResult, fieldTestId: string, errorMessage: string): void => {
  const passwordStatus = sut.getByTestId(fieldTestId)
  expect(passwordStatus.title).toBe(errorMessage)
  expect(passwordStatus.textContent).toBe('✗')
}

export const testStatusFieldSuccess = (sut: RenderResult, fieldTestId: string): void => {
  const emailStatus = sut.getByTestId(fieldTestId)
  expect(emailStatus.title).toBe('Campo preenchido corretamente')
  expect(emailStatus.textContent).toBe('✓')
}

export const testElementExist = (sut: RenderResult, fieldTestId: string): void => {
  const spinner = sut.getByTestId(fieldTestId)
  expect(spinner).toBeTruthy()
}

export const testWaitTextContent = async (sut: RenderResult, waitFieldTestId: string, testFieldTestId: string, content?: string): Promise<void> => {
  const waitElement = sut.getByTestId(waitFieldTestId)
  await waitFor(() => waitElement)
  const element = sut.getByTestId(testFieldTestId)
  expect(element.textContent).toBe(content)
}

export const testCalledWith = (sut: RenderResult, spy: jest.SpyInstance, fieldName: string, value: any = faker.random.alphaNumeric()): void => {
  fakerField(sut, fieldName, value)
  expect(spy).toBeCalledWith(fieldName, value)
}
