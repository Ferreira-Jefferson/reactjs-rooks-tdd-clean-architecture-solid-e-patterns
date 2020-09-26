import React, { useContext, useEffect, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

const label: Record<string, string> = {
  name: 'Nome',
  email: 'Email',
  password: 'Senha',
  passwordConfirmation: 'Confirmar senha'
}

const getLabel = (name: string): string => label[name]

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, errorState, setState, setErrorState, validation } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    const { email, password, name, passwordConfirmation } = state
    const formData = { email, password, name, passwordConfirmation }
    const error = validation.validate(props.name, formData)
    if (!error) {
      setErrorState({
        ...errorState,
        [props.name]: error
      })
    } else {
      setErrorState({
        ...errorState,
        [props.name]: error
      })
    }
  }
  useEffect(() => {
    const hasError = Object.values(errorState).findIndex(value => /(obrigat.rio|inv.lido)/gi.test(value as string)) >= 0
    setState({
      ...state,
      isFormInvalid: hasError
    })
  }, [errorState[props.name]])

  return (
    <div className={Styles.inputWrap} data-testid={`${props.name}-wrap`} >
      <input id={props.name} ref={inputRef} data-testid={props.name} {...props}
        title={errorState[props.name]} onChange={handleChange} data-status={errorState[props.name] ? 'invalid' : 'valid'}
      />
      <label data-testid={`${props.name}-label`} htmlFor={props.name}>{
        getLabel(props.name)
      }</label>
    </div>
  )
}

export default Input
