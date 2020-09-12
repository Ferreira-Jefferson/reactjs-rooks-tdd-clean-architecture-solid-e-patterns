import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  describe('Initial State', () => {
    it('should not render spinner and error on start', () => {
      const { getByTestId } = render(<Login />)
      const errorWrap = getByTestId('error-wrap')
      expect(errorWrap.childElementCount).toBe(0)
    })

    it('should submit button disabled', () => {
      const { getByTestId } = render(<Login />)
      const submitButton = getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)
    })

    it('should input email is required', () => {
      const { getByTestId } = render(<Login />)
      const emailStatus = getByTestId('email-status')
      expect(emailStatus.title).toBe('Campo obrigatório')
      expect(emailStatus.textContent).toBe('*')
    })

    it('should input password is required', () => {
      const { getByTestId } = render(<Login />)
      const passwordStatus = getByTestId('password-status')
      expect(passwordStatus.title).toBe('Campo obrigatório')
      expect(passwordStatus.textContent).toBe('*')
    })
  })
})
