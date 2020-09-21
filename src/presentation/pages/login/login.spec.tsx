import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Validation } from '@/presentation/protocols/validation'
import { InvalidCredentialsError } from '@/domain/errors'
import { stubValidation, stubAuthentication, fakeLoginModel, stubSaveAccessToken, Helper } from '@/presentation/test'
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
      Helper.testChildCount(sut, 'error-wrap', 0)
    })

    it('should submit button disabled', () => {
      const { sut } = makeSut()
      Helper.testButtonIsDisabled(sut, 'submit', true)
    })

    it('should input email is required', () => {
      const { sut } = makeSut()
      Helper.testStatusFieldFails(sut, 'email-status', 'Campo obrigatório')
    })

    it('should input password is required', () => {
      const { sut } = makeSut()
      Helper.testStatusFieldFails(sut, 'password-status', 'Campo obrigatório')
    })
  })

  describe('Fields Validation', () => {
    it('should call Validation with correct fields', () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const value = faker.random.alphaNumeric()
      const fields = ['email', 'password']
      for (const field of fields) {
        Helper.testCalledWith(sut, validateSpy, field, value)
      }
    })

    it('should show email error if Validation fails', () => {
      const { sut, validationStub } = makeSut()
      const errorMessage = faker.random.words()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(errorMessage)
      Helper.fakerField(sut, 'email')
      Helper.testStatusFieldFails(sut, 'email-status', errorMessage)
    })

    it('should show password error if Validation fails', () => {
      const { sut, validationStub } = makeSut()
      const errorMessage = faker.random.words()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(errorMessage)
      Helper.fakerField(sut, 'password')
      Helper.testStatusFieldFails(sut, 'password-status', errorMessage)
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()
      Helper.fakerField(sut, 'email')
      Helper.testStatusFieldSuccess(sut, 'email-status')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()
      Helper.fakerField(sut, 'password')
      Helper.testStatusFieldSuccess(sut, 'password-status')
    })
  })

  describe('Authentication', () => {
    it('should enable button if form is valid', () => {
      const { sut } = makeSut()
      Helper.testButtonIsDisabled(sut, 'submit', true)
    })

    it('should show spinner on submit', () => {
      const { sut } = makeSut()
      fakeLoginModel(sut)
      Helper.testElementExist(sut, 'spinner')
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

    it('should not call Authentication if form is invalid', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      fireEvent.submit(sut.getByTestId('form'))
      expect(authSpy).toBeCalledTimes(0)
    })

    it('should call Authentication only once', () => {
      const { sut, authenticationStub } = makeSut()
      const authSpy = jest.spyOn(authenticationStub, 'auth')
      fakeLoginModel(sut)
      fakeLoginModel(sut)
      expect(authSpy).toBeCalledTimes(1)
    })

    it('should present error if Authentication fails', async () => {
      const { sut, authenticationStub } = makeSut()
      const error = new InvalidCredentialsError()
      jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
      fakeLoginModel(sut)
      await Helper.testWaitTextContent(sut, 'error-wrap', 'main-error', error.message)
      Helper.testChildCount(sut, 'error-wrap', 1)
    })

    it('should call SaveAccessToken on success', async () => {
      const { sut, saveAccessTokenStub } = makeSut()
      const saveSpy = jest.spyOn(saveAccessTokenStub, 'save')
      fakeLoginModel(sut)
      await waitFor(() => sut.getByTestId('form'))
      expect(saveSpy).toBeCalledTimes(1)
    })

    it('should present error if SaveAccessToken fails', async () => {
      const { sut, saveAccessTokenStub } = makeSut()
      const error = new Error('any_error')
      jest.spyOn(saveAccessTokenStub, 'save').mockRejectedValueOnce(error)
      fakeLoginModel(sut)
      await Helper.testWaitTextContent(sut, 'error-wrap', 'main-error', error.message)
      Helper.testChildCount(sut, 'error-wrap', 1)
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
