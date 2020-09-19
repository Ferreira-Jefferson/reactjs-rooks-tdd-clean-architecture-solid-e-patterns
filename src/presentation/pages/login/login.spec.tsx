import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/validation'
import { InvalidCredentialsError } from '@/domain/errors'
import { stubValidation, stubAuthentication, fakeLoginModel, fakeEmail, fakePassword, stubSaveAccessToken } from '@/presentation/test'
import { Authentication } from '@/domain/usecases'
import Login from './login'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

type SutTypes = {
  sut: RenderResult
  validationStub: Validation
  authenticationStub: Authentication
  saveAccessTokenStub: SaveAccessToken
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (): SutTypes => {
  const validationStub = stubValidation()
  const authenticationStub = stubAuthentication()
  const saveAccessTokenStub = stubSaveAccessToken()
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationStub}
        saveAccessToken={saveAccessTokenStub}
      />
    </Router>
  )
  return {
    sut,
    validationStub,
    authenticationStub,
    saveAccessTokenStub
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
      testValidateFails(sut, 'email-status', errorMessage)
    })

    it('should show password error if Validation fails', () => {
      const { sut, validationStub } = makeSut()
      const errorMessage = faker.random.words()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(errorMessage)
      fakePassword(sut)
      testValidateFails(sut, 'password-status', errorMessage)
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()
      fakeEmail(sut)
      testValidateSuccess(sut, 'email-status')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()
      fakePassword(sut)
      testValidateSuccess(sut, 'password-status')
    })
  })

  describe('Authentication', () => {
    it('should enable button if form is valid', () => {
      const { sut } = makeSut()
      const { submitButton } = fakeLoginModel(sut)
      expect(submitButton.disabled).toBe(false)
    })

    it('should show spinner on submit', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })

    it('should call Authentication with correct values', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      const { emailInput, passwordInput } = fakeLoginModel(sut)
      expect(authSpy).toBeCalledWith({
        email: emailInput?.value,
        password: passwordInput?.value
      })
    })

    it('should call Authentication only once', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      fakeLoginModel(sut)
      fakeLoginModel(sut)
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
      const errorWrap = sut.getByTestId('error-wrap')
      await waitFor(() => errorWrap)
      const mainError = sut.getByTestId('main-error')
      expect(mainError.textContent).toBe(error.message)
      expect(errorWrap.childElementCount).toBe(1)
    })

    it('should call SaveAccessToken on success', async () => {
      const { sut, saveAccessTokenStub } = makeSut()
      const saveSpy = jest.spyOn(saveAccessTokenStub, 'save')
      fakeLoginModel(sut)
      await waitFor(() => sut.getByTestId('form'))
      expect(saveSpy).toBeCalledTimes(1)
    })

    it('should go to main page on success', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
