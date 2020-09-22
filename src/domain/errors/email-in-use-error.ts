export class EmailInUseError extends Error {
  constructor () {
    super('E-mail já cadastrado')
    this.name = 'EmailInUseError'
  }
}
