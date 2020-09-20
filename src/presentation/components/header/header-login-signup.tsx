import React, { memo } from 'react'
import Styles from './header-login-signup-styles.scss'
import { Logo } from '@/presentation/components/'

const HeaderLoginSignUp: React.FC = () => (
  <header className={Styles.header}>
    <Logo />
    <h1>4Dev - Enquetes para Programadores</h1>
  </header>
)

export default memo(HeaderLoginSignUp)
