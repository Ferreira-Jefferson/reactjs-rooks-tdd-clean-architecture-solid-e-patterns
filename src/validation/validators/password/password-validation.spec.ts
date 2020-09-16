
import { InvalidFieldError } from '@/validation/errors'
import { PasswordValidation } from './password-validation'

describe('PasswordValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = new PasswordValidation('password_field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError('password_field'))
  })
})
