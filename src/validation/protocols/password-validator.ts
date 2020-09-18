export type PasswordRules = {
  min?: number
  max?: number
  upper?: boolean
  lower?: boolean
  digits?: boolean
  space?: boolean
  symbols?: boolean
  blackList?: string[]
}

export interface PasswordValidator {
  readonly rules?: PasswordRules
  validate: (password: string) => boolean
}
