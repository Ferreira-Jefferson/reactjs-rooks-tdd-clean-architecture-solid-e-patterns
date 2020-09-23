import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'
import { HeaderLogin, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    isFormInvalid: true
  })
  const [errorState, setErrorState] = useState({
    mainError: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (!state.isLoading && !state.isFormInvalid) {
        setState({ ...state, isLoading: true })
        const account = await authentication.auth({
          email: state.email,
          password: state.password
        })
        await saveAccessToken.save(account.accessToken)
        history.replace('/')
      }
    } catch (error) {
      setState({ ...state, isLoading: false })
      setErrorState({ ...errorState, mainError: error.message })
    }
  }

  return (
    <div className={Styles.login}>
      <HeaderLogin />
      <Context.Provider value={{ state, setState, errorState, setErrorState, validation }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton disabled={!!state.isFormInvalid} value="Entrar" />
          <Link data-testid="toSignup" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
