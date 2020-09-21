import { RenderResult, waitFor } from '@testing-library/react'

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
