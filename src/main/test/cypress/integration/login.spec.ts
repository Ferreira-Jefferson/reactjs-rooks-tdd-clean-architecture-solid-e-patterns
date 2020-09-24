import faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '✗')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '✗')
    cy.getByTestId('submit')
      .should('contain.text', 'Entrar')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
    cy.getByTestId('toSignup')
      .should('contain.text', 'Criar conta')
      .should('have.attr', 'href', '/signup')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo email inválido')
      .should('contain.text', '✗')
    cy.getByTestId('password').type(faker.random.word())
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo password inválido')
      .should('contain.text', '✗')
    cy.getByTestId('submit')
      .should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
