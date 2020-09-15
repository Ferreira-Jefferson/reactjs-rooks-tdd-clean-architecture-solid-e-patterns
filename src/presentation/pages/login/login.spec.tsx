import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/validation'
import { stubValidation, stubAuthentication, fakeLoginModel, fakeEmail, fakePassword } from '@/presentation/test'
import { Authentication } from '@/domain/usecases'
import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = stubValidation()
  const authenticationStub = stubAuthentication()
  const sut = render(<Login validation={validationStub} authentication={authenticationStub}/>)
  return {
    sut,
    validationStub,
    authenticationStub
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
      expect(emailStatus.textContent).toBe('✗')
    })

    it('should input password is required', () => {
      const { sut } = makeSut()
      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe('Campo obrigatório')
      expect(passwordStatus.textContent).toBe('✗')
    })
  })

  describe('Fields Validation', () => {
    const fakeValidateFails = (sut: RenderResult, testId: string, errorMessage: string): void => {
      const passwordStatus = sut.getByTestId(testId)
      expect(passwordStatus.title).toBe(errorMessage)
      expect(passwordStatus.textContent).toBe('✗')
    }

    const fakeValidateSuccess = (sut: RenderResult, testId: string): void => {
      const emailStatus = sut.getByTestId(testId)
      expect(emailStatus.title).toBe('Campo preenchido corretamente')
      expect(emailStatus.textContent).toBe('✓')
    }

    it('should call Validation with correct email', () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const email = faker.internet.email()
      fakeEmail(sut, email)
      expect(validateSpy).toBeCalledWith('email', email)
    })

    it('should call Validation with correct password', () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const password = faker.internet.password()
      fakePassword(sut, password)
      expect(validateSpy).toBeCalledWith('password', password)
    })

    it('should show email error if Validation fails', () => {
      const { sut, validationStub } = makeSut()
      const errorMessage = faker.random.words()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(errorMessage)
      fakeEmail(sut)
      fakeValidateFails(sut, 'email-status', errorMessage)
    })

    it('should show password error if Validation fails', () => {
      const { sut, validationStub } = makeSut()
      const errorMessage = faker.random.words()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(errorMessage)
      fakePassword(sut)
      fakeValidateFails(sut, 'password-status', errorMessage)
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      fakeValidateSuccess(sut, 'email-status')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      fakeValidateSuccess(sut, 'password-status')
    })
  })

  describe('Submit', () => {
    it('should enable button if form is valid', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(false)
    })

    it('should show spinner on submit', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      const submitButton = sut.getByTestId('submit')
      fireEvent.click(submitButton)
      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })

    it('should call Authentication with correct values', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      const { emailInput, passwordInput } = fakeLoginModel(sut)
      const submitButton = sut.getByTestId('submit')
      fireEvent.click(submitButton)
      expect(authSpy).toBeCalledWith({
        email: emailInput?.value,
        password: passwordInput?.value
      })
    })

    it('should call Authentication only once', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      fakeLoginModel(sut)
      const submitButton = sut.getByTestId('submit')
      fireEvent.click(submitButton)
      fireEvent.click(submitButton)
      expect(authSpy).toBeCalledTimes(1)
    })

    it('should call Authentication if form is invalid', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      fireEvent.submit(sut.getByTestId('form'))
      expect(authSpy).toBeCalledTimes(0)
    })

    it('should present error if Authentication fails', async () => {
      const { sut, authenticationStub } = makeSut()
      const error = new InvalidCredentialsError()
      jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
      fakeLoginModel(sut)
      const submitButton = sut.getByTestId('submit')
      fireEvent.click(submitButton)
      const errorWrap = sut.getByTestId('error-wrap')
      await waitFor(() => errorWrap)
      const mainError = sut.getByTestId('main-error')
      expect(mainError.textContent).toBe(error.message)
      expect(errorWrap.childElementCount).toBe(1)
    })
  })
})
