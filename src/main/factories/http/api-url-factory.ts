export const makeApiUrl = (path: string): string => {
  const finalPath = /^\/./.test(path) ? path : `/${path}`
  return `https://api-clean-node.herokuapp.com/api${finalPath}`
}
