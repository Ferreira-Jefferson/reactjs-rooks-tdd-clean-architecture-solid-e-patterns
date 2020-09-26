import * as FormHelper from './../support/form-helper'
import faker from 'faker'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Nome', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Senha', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Confirmar senha', 'Campo obrigatório')
    cy.getByTestId('submit')
      .should('contain.text', 'Cadastrar')
      .should('have.attr', 'disabled')
    FormHelper.testNotHasDescendants('error-wrap')
    cy.getByTestId('toLogin')
      .should('contain.text', 'Voltar')
      .should('have.attr', 'href', '/login')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Email', 'Campo inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Senha', 'Campo inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('passwordConfirmation', 'Confirmar senha', 'Campo inválido')
    FormHelper.testIsDisabled('submit')
    FormHelper.testNotHasDescendants('error-wrap')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.findName())
    FormHelper.testInputStatus('name', 'Nome')
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email', 'Email')
    const password = faker.internet.password(10, false, '', '@2Aa')
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password', 'Senha')
    cy.getByTestId('passwordConfirmation').type(password + ' ')
    FormHelper.testInputStatus('passwordConfirmation', 'Confirmar senha')
    cy.getByTestId('submit')
      .should('not.have.attr', 'disabled')
    FormHelper.testNotHasDescendants('error-wrap')
  })
})
