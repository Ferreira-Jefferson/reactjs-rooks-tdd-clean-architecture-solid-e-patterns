import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, errorState, setState, setErrorState, validation } = useContext(Context)
  const message = errorState[props.name]
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
  const getStatus = (): string => '*'
  const getTitle = (): string => message
  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange} onBlur={handleErrorChange}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
