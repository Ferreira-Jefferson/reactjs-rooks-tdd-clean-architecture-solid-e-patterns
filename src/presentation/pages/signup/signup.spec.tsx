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
})
