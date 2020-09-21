import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import { HeaderSignUp, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
  const [errorState] = useState({
    name: 'Campo obrigatório',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })
  return (
    <div className={Styles.signup}>
      <HeaderSignUp/>
      <Context.Provider value={{ state: {}, errorState }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <a className={Styles.link}>Voltar</a>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
