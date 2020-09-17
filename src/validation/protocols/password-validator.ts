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
  validate: (password: string, rules?: PasswordRules) => boolean
}
