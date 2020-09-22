import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { HeaderSignUp, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isLoading: false
  })
  const [errorState, setErrorState] = useState({
    mainError: '',
    name: 'Campo obrigatório',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    passwordConfirmation: 'Campo obrigatório'
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const hasError = Object.values(errorState).includes('Campo obrigatório')
    try {
      if (!state.isLoading && !hasError) {
        setState({ ...state, isLoading: true })
        const account = await addAccount.add({
          name: state.name,
          email: state.email,
          password: state.password,
          passwordConfirmation: state.passwordConfirmation
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
    <div className={Styles.signup}>
      <HeaderSignUp/>
      <Context.Provider value={{ state, setState, errorState, setErrorState, validation }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button data-testid="submit" disabled={!!errorState.name || !!errorState.email || !!errorState.password || !!errorState.passwordConfirmation} className={Styles.submit} type="submit">Entrar</button>
          <Link data-testid="toLogin" to="/login" className={Styles.link}>Voltar</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
