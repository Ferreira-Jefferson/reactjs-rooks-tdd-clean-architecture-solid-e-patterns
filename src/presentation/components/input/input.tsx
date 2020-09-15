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
  }
  const handleErrorChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setErrorState({
      ...errorState,
      [event.target.name]: validation.validate(event.target.name, event.target.value)
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
  }, [messageState])

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange} onBlur={handleErrorChange}/>
      <span data-testid={`${props.name}-status`} title={status.title} className={Styles[`status${status.name}`]}>{status.value}</span>
    </div>
  )
}

export default Input
