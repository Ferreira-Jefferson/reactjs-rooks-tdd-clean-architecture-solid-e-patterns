import * as FormHelper from './../support/form-helper'

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
})
