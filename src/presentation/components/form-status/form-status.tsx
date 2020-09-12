import React from 'react'
import Styles from './form-status-style.scss'
import { Spinner } from '@/presentation/components'
const FormStatus: React.FC = () => (

  <div className={Styles.errorWrap}>
    <Spinner className={Styles.spinner}/>
    <span className={Styles.error}>Erro</span>
  </div>
)

export default FormStatus
