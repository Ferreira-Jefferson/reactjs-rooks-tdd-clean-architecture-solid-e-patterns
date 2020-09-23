import { Validation } from '@/presentation/protocols/validation'

export const stubValidation = (): Validation => {
  class ValidationStub implements Validation {
    errorMessage: string
    validate (fieldName: string, input: object): string {
      return null
    }
  }
  return new ValidationStub()
}
