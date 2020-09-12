import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { HeaderLogin, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })
  return (
    <div className={Styles.login}>
      <HeaderLogin />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
