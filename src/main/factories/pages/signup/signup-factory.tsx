import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount, makeSignUpValidation, makeLocalSaveAccessToken } from '@/main/factories'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
