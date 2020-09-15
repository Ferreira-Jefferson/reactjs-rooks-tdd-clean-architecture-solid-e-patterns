import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { HeaderLogin, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: ''
  })
  const [errorState, setErrorState] = useState({
    mainError: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!state.isLoading) {
      setState({ ...state, isLoading: true })
      await authentication.auth({
        email: state.email,
        password: state.password
      })
    }
  }

  return (
    <div className={Styles.login}>
      <HeaderLogin />
      <Context.Provider value={{ state, setState, errorState, setErrorState, validation }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled={!!errorState.email || !!errorState.password
          } className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
