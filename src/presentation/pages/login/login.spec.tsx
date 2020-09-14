import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test/stub-validation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = render(<Login validation={validationStub}/>)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  describe('Initial State', () => {
    it('should not render spinner and error on start', () => {
      const { sut } = makeSut()
      const errorWrap = sut.getByTestId('error-wrap')
      expect(errorWrap.childElementCount).toBe(0)
    })

    it('should submit button disabled', () => {
      const { sut } = makeSut()
      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)
    })

    it('should input email is required', () => {
      const { sut } = makeSut()
      const emailStatus = sut.getByTestId('email-status')
      expect(emailStatus.title).toBe('Campo obrigatório')
      expect(emailStatus.textContent).toBe('*')
    })

    it('should input password is required', () => {
      const { sut } = makeSut()
      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe('Campo obrigatório')
      expect(passwordStatus.textContent).toBe('*')
    })
  })

  describe('Fields Validation', () => {
    it('should call Validation with correct email', () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const emailInput = sut.getByTestId('email')
      const email = faker.internet.email()
      fireEvent.input(emailInput, { target: { value: email } })
      expect(validateSpy).toBeCalledWith('email', email)
    })

    it('should call Validation with correct password', () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const passwordInput = sut.getByTestId('password')
      const password = faker.internet.password()
      fireEvent.input(passwordInput, { target: { value: password } })
      expect(validateSpy).toBeCalledWith('password', password)
    })
  })
})
