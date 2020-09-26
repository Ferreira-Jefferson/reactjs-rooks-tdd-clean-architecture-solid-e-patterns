import faker from 'faker'
import * as FormHelper from './../support/form-helper'
import * as FakeResponse from './../support/fake-response'

const fakeLogin = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.internet.password(10, false, '', '@2Aa'))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Senha', 'Campo obrigatório')
    cy.getByTestId('submit')
      .should('contain.text', 'Entrar')
      .should('have.attr', 'disabled')
    FormHelper.testNotHasDescendants('error-wrap')
    cy.getByTestId('toSignup')
      .should('contain.text', 'Criar conta')
      .should('have.attr', 'href', '/signup')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Email', 'Campo inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Senha', 'Campo inválido')
    FormHelper.testIsDisabled('submit')
    FormHelper.testNotHasDescendants('error-wrap')
  })

  it('should present error state if only email field is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email', 'Email')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Senha', 'Campo inválido')
    FormHelper.testIsDisabled('submit')
    FormHelper.testNotHasDescendants('error-wrap')
  })

  it('should present error state if only password field is valid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Email', 'Campo inválido')
    cy.getByTestId('password').type(faker.internet.password(10, false, '', '@2Aa'))
    FormHelper.testInputStatus('password', 'Senha')
    FormHelper.testIsDisabled('submit')
    FormHelper.testNotHasDescendants('error-wrap')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email', 'Email')
    cy.getByTestId('password').type(faker.internet.password(10, false, '', '@2Aa'))
    cy.getByTestId('submit')
      .should('not.have.attr', 'disabled')
    FormHelper.testNotHasDescendants('error-wrap')
  })

  it('should present spinner pending the request', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.internet.password(10, false, '', '@2Aa')).type('{enter}')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
  })

  it('should present UnexpectedError on 400', () => {
    FakeResponse.unexpectedError(/login/, 'POST')
    fakeLogin()
    cy.getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Algum erro ocorreu. Verifique sua conexão e tente novamente.')
    FormHelper.testUrlCalled('/login')
  })

  it('should present InvalidCredentialsError on 401', () => {
    FakeResponse.invalidCredentialsError(/login/)
    fakeLogin()
    cy.getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais Inválidas')
    FormHelper.testUrlCalled('/login')
  })

  it('should present UnexpectedError if invalid data is returned', () => {
    FakeResponse.ok(/login/, 'POST', { invalidProperty: faker.random.uuid() })
    fakeLogin()
    cy.getByTestId('main-error').should('contain.text', 'Algum erro ocorreu. Verifique sua conexão e tente novamente.')
  })

  it('should save accessToken if valid credentials are provided', () => {
    FakeResponse.ok(/login/, 'POST', { accessToken: faker.random.uuid() })
    fakeLogin()
    FormHelper.testNotHasDescendants('error-wrap')
    FormHelper.testUrlCalled('/')
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should prevent multiple submits', () => {
    FakeResponse.ok(/login/, 'POST', { accessToken: faker.random.uuid() })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(10, false, '', '@2Aa'))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    FakeResponse.ok(/login/, 'POST', { accessToken: faker.random.uuid() })
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('password')
      .type(faker.internet.password(10, false, '', '@2Aa')).type('{enter')
    cy.get('@request.all').should('have.length', 0)
  })
})
