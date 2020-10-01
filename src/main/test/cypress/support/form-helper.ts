const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (field: string, label: string, error?: string): void => {
  cy.getByTestId(field)
    .should(error ? 'have.attr' : 'not.have.attr', 'title', error)
    .should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  cy.getByTestId(`${field}-label`)
    .should('contain.text', label)
}

export const testUrlCalled = (url: string): void => {
  cy.url().should('eq', `${baseUrl}${url}`)
}

export const testIsDisabled = (field: string): void => {
  cy.getByTestId(field)
    .should('have.attr', 'disabled')
}

export const testNotHasDescendants = (field: string): void => {
  cy.getByTestId(field).should('not.have.descendants')
}
