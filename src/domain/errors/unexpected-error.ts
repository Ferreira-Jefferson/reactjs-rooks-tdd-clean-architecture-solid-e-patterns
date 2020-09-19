export class UnexpectedError extends Error {
  constructor () {
    super('Algum erro ocorreu. Verifique sua conexão e tente novamente.')
    this.name = 'UnexpectedError'
  }
}
