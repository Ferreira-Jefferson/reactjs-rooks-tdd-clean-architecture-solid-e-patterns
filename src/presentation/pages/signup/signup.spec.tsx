import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'

const makeSut = (): RenderResult => {
  return render(
    <SignUp />
  )
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

const testStatusField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  if (validationError) {
    testValidateFails(sut, fieldName, validationError)
  } else {
    testValidateSuccess(sut, fieldName)
  }
}

const testValidateFails = (sut: RenderResult, testId: string, errorMessage: string): void => {
  const passwordStatus = sut.getByTestId(testId)
  expect(passwordStatus.title).toBe(errorMessage)
  expect(passwordStatus.textContent).toBe('✗')
}

const testValidateSuccess = (sut: RenderResult, testId: string): void => {
  const emailStatus = sut.getByTestId(testId)
  expect(emailStatus.title).toBe('Campo preenchido corretamente')
  expect(emailStatus.textContent).toBe('✓')
}

describe('Signup Component', () => {
  describe('Initial State', () => {
    it('should not render spinner and error on start', () => {
      const sut = makeSut()
      testChildCount(sut, 'error-wrap', 0)
    })
  })

  it('should submit button disabled', () => {
    const sut = makeSut()
    testButtonIsDisabled(sut, 'submit', true)
  })

  it('should input name is required', () => {
    const sut = makeSut()
    const errorMessage = 'Campo obrigatório'
    testStatusField(sut, 'name-status', errorMessage)
  })

  it('should input email is required', () => {
    const sut = makeSut()
    const errorMessage = 'Campo obrigatório'
    testStatusField(sut, 'email-status', errorMessage)
  })

  it('should input password is required', () => {
    const sut = makeSut()
    const errorMessage = 'Campo obrigatório'
    testStatusField(sut, 'password-status', errorMessage)
  })
})
