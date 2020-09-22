import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import faker from 'faker'
import { SignUp } from '@/presentation/pages'
import { Helper, stubValidation, fakeSignUpSubmit, stubAddAccount } from '@/presentation/test'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type SutTypes = {
  sut: RenderResult
  validationStub: Validation
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const addAccountStub = stubAddAccount()
  const validationStub = stubValidation()
  const sut = render(
    <SignUp
      validation={validationStub}
      addAccount={addAccountStub}
    />
  )
  return {
    sut,
    validationStub,
    addAccountStub
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)
  const fields = ['name', 'email', 'password', 'passwordConfirmation']

  describe('Initial State', () => {
    it('should not render spinner and error on start', () => {
      const { sut } = makeSut()
      Helper.testElementExist(sut, 'error-wrap')
      Helper.testChildCount(sut, 'error-wrap', 0)
    })

    it('should submit button disabled', () => {
      const { sut } = makeSut()
      Helper.testButtonIsDisabled(sut, 'submit', true)
    })

    it('should input name is required', () => {
      const { sut } = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'name-status', errorMessage)
    })

    it('should input email is required', () => {
      const { sut } = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'email-status', errorMessage)
    })

    it('should input password is required', () => {
      const { sut } = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'password-status', errorMessage)
    })

    it('should input passwordConfirmation is required', () => {
      const { sut } = makeSut()
      const errorMessage = 'Campo obrigatório'
      Helper.testStatusFieldFails(sut, 'passwordConfirmation-status', errorMessage)
    })
  })

  describe('Fields Validation', () => {
    it('should call Validation with correct fields', () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const value = faker.random.alphaNumeric()
      for (const field of fields) {
        Helper.testCalledWith(sut, validateSpy, field, value)
      }
    })

    it('should show message field error if Validation fails', () => {
      const { sut, validationStub } = makeSut()
      const errorMessage = faker.random.words()
      jest.spyOn(validationStub, 'validate').mockReturnValue(errorMessage)
      for (const field of fields) {
        Helper.fakerField(sut, field)
        Helper.testStatusFieldFails(sut, `${field}-status`, errorMessage)
      }
    })

    it('should show valid field state if Validation succeeds', () => {
      const { sut } = makeSut()
      for (const field of fields) {
        Helper.fakerField(sut, field)
        Helper.testStatusFieldSuccess(sut, `${field}-status`)
      }
    })

    it('should enable button if form is valid', () => {
      const { sut } = makeSut()
      fakeSignUpSubmit(sut)
      Helper.testButtonIsDisabled(sut, 'submit', false)
    })
  })

  describe('AddAccount', () => {
    it('should show spinner on submit', () => {
      const { sut } = makeSut()
      fakeSignUpSubmit(sut)
      Helper.testElementExist(sut, 'spinner')
    })

    it('should call AddAccount with correct values', () => {
      const { sut, addAccountStub } = makeSut()
      const addSpy = jest.spyOn(addAccountStub, 'add')
      const { name, email, password, passwordConfirmation } = fakeSignUpSubmit(sut)
      expect(addSpy).toBeCalledWith({
        name,
        email,
        password,
        passwordConfirmation
      })
    })

    it('should call AddAccount only once', () => {
      const { sut, addAccountStub } = makeSut()
      const addSpy = jest.spyOn(addAccountStub, 'add')
      fakeSignUpSubmit(sut)
      fakeSignUpSubmit(sut)
      expect(addSpy).toBeCalledTimes(1)
    })

    it('should not call AddAccount if form is invalid', () => {
      const { sut, addAccountStub } = makeSut()
      const addSpy = jest.spyOn(addAccountStub, 'add')
      fireEvent.submit(sut.getByTestId('form'))
      expect(addSpy).toBeCalledTimes(0)
    })
  })
})
