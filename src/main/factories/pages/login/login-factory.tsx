import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication, makeLoginValidation, makeLocalSaveAccessToken } from '@/main/factories'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
