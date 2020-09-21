import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { Helper } from '@/presentation/test'

const makeSut = (): RenderResult => {
  return render(
    <SignUp />
  )
}

describe('SignUp Component', () => {
  describe('Initial State', () => {
    it('should not render spinner and error on start', () => {
      const sut = makeSut()
      Helper.testChildCount(sut, 'error-wrap', 0)
    })

    it('should submit button disabled', () => {
      const sut = makeSut()
      Helper.testButtonIsDisabled(sut, 'submit', true)
    })

    it('should input name is required', () => {
      const sut = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'name-status', errorMessage)
    })

    it('should input email is required', () => {
      const sut = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'email-status', errorMessage)
    })

    it('should input password is required', () => {
      const sut = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'password-status', errorMessage)
    })

    it('should input passwordConfirmation is required', () => {
      const sut = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'passwordConfirmation-status', errorMessage)
    })
  })
})
