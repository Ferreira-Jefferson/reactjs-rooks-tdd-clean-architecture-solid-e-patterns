import React, { memo } from 'react'
import Styles from './header-login-styles.scss'
import { Logo } from '@/presentation/components/'

const HeaderLogin: React.FC = () => (
  <header className={Styles.header}>
    <Logo />
    <h1>4Dev - Enquetes para Programadores</h1>
  </header>
)

export default memo(HeaderLogin)
