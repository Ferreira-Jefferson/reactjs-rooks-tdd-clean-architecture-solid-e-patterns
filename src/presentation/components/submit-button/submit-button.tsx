import React from 'react'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const SubmitButton: React.FC<Props> = (props: Props) => {
  return (
    <button data-testid="submit" disabled={props.disabled
    } type="submit">{ props.value }</button>
  )
}

export default SubmitButton
