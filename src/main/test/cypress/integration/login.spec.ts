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
})
