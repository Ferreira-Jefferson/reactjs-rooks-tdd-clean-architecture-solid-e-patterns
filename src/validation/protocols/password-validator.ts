export type PasswordOptions = {
  min?: number
  max?: number
  upper?: boolean
  lower?: boolean
  digits?: boolean
  space?: boolean
  blackList?: [string]
}

export interface PasswordValidator {
  validate: (password: string, opts?: PasswordOptions) => boolean
}
