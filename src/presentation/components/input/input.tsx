import React, { useState, useContext, useEffect } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const [status, setStatus] = useState({
    name: '',
    value: '',
    title: ''
  })
  const { state, errorState, setState, setErrorState, validation } = useContext(Context)
  const messageState = errorState[props.name]
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    const { email, password, name, passwordConfirmation } = state
    const formData = { email, password, name, passwordConfirmation }
    setErrorState({
      ...errorState,
      [event.target.name]: validation.validate(event.target.name, formData)
    })
  }

  useEffect(() => {
    if (messageState) {
      setStatus({
        name: 'Fail',
        value: '✗',
        title: messageState
      })
    } else {
      setStatus({
        name: 'Ok',
        value: '✓',
        title: 'Campo preenchido corretamente'
      })
    }
    setState({
      ...state,
      isFormInvalid: Object.values(errorState).find(value => /(obrigat.rio|inv.lido)/gi.test(value as string))
    })
  }, [messageState])

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange}/>
      <span data-testid={`${props.name}-status`} title={status.title} className={Styles[`status${status.name}`]}>{status.value}</span>
    </div>
  )
}

export default Input
