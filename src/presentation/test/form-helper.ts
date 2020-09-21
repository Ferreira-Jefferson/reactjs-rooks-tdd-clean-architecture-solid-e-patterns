import { RenderResult } from '@testing-library/react'

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
