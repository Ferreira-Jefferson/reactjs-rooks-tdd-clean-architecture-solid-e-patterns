type URL = {
  login: string
}

export const makeApiUrl = (): URL => {
  const login = 'https://api-clean-node.herokuapp.com/api/login'
  return {
    login
  }
}
