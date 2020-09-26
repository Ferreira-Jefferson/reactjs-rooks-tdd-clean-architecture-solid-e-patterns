import faker from 'faker'

const before = (): void => { cy.server() }

export const invalidCredentialsError = (url: RegExp): void => {
  before()
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: {
      erro: faker.random.words()
    }
  }).as('request')
}

export const unexpectedError = (url: RegExp, method: string): void => {
  before()
  cy.route({
    method,
    url,
    status: faker.helpers.randomize([400, 404, 500]),
    response: {
      erro: faker.random.words()
    }
  }).as('request')
}

export const ok = (url: RegExp, method: string, response: any): void => {
  before()
  cy.route({
    method,
    url,
    status: 200,
    response
  }).as('request')
}
