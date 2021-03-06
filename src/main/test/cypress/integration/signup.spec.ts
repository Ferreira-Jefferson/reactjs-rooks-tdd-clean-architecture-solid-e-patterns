import * as FormHelper from './../support/form-helper'
import * as FakeResponse from './../support/fake-response'
import faker from 'faker'

const populateFields = (): void => {
  cy.getByTestId('name').type(faker.name.findName())
  FormHelper.testInputStatus('name', 'Nome')
  cy.getByTestId('email').type(faker.internet.email())
  FormHelper.testInputStatus('email', 'Email')
  const password = faker.internet.password(10, false, '', '@2Aa')
  cy.getByTestId('password').type(password)
  FormHelper.testInputStatus('password', 'Senha')
  cy.getByTestId('passwordConfirmation').type(password + ' ')
  FormHelper.testInputStatus('passwordConfirmation', 'Confirmar senha')
}

const fakeSignUp = (): void => {
  populateFields()
  cy.getByTestId('submit')
    .should('not.have.attr', 'disabled')
  cy.getByTestId('submit').click()
}

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
    fakeSignUp()
    FormHelper.testNotHasDescendants('error-wrap')
  })

  it('should present spinner pending the request', () => {
    cy.getByTestId('name').type(faker.name.findName())
    cy.getByTestId('email').type(faker.internet.email())
    const password = faker.internet.password(10, false, '', '@2Aa')
    cy.getByTestId('password').type(password)
    cy.getByTestId('passwordConfirmation').type(password + ' ').type('{enter}')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
  })

  it('should present EmailInUseError on 403', () => {
    FakeResponse.emailInUseError(/signup/)
    fakeSignUp()
    cy.getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'E-mail já cadastrado')
    FormHelper.testUrlCalled('/signup')
  })

  it('should present UnexpectedError if invalid data is returned', () => {
    FakeResponse.ok(/signup/, 'POST', { invalidProperty: faker.random.uuid() })
    fakeSignUp()
    cy.getByTestId('main-error').should('contain.text', 'Algum erro ocorreu. Verifique sua conexão e tente novamente.')
  })

  it('should present UnexpectedError on 400', () => {
    FakeResponse.unexpectedError(/signup/, 'POST')
    fakeSignUp()
    cy.getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Algum erro ocorreu. Verifique sua conexão e tente novamente.')
    FormHelper.testUrlCalled('/signup')
  })

  it('should save accessToken if valid credentials are provided', () => {
    FakeResponse.ok(/signup/, 'POST', { accessToken: faker.random.uuid() })
    fakeSignUp()
    FormHelper.testNotHasDescendants('error-wrap')
    FormHelper.testUrlCalled('/')
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should not call submit if form is invalid', () => {
    FakeResponse.invalidCredentialsError(/signup/)
    cy.getByTestId('name').type(faker.name.findName())
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('passwordConfirmation').type(faker.internet.password()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
