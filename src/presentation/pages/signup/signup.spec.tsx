import React from 'react'
import { render, RenderResult, cleanup } from '@testing-library/react'
import faker from 'faker'
import { SignUp } from '@/presentation/pages'
import { Helper, stubValidation } from '@/presentation/test'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = stubValidation()
  const sut = render(
    <SignUp
      validation={validationStub}
    />
  )
  return {
    sut,
    validationStub
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

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
      const fields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of fields) {
        Helper.testCalledWith(sut, validateSpy, field, value)
      }
    })
  })
})
