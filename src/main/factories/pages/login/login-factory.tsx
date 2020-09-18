import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication, makeLoginValidation } from '@/main/factories'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
