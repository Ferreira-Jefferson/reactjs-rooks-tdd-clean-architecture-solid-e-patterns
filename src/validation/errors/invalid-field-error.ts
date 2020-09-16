export class InvalidFieldError extends Error {
  constructor (private readonly fieldLabel: string) {
    super(`Campo ${fieldLabel} inválido`)
    this.name = 'InvalidFieldError'
  }
}
