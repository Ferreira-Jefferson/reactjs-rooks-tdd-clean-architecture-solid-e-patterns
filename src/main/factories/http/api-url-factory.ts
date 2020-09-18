export const makeApiUrl = (path: string): string => {
  const standardizedPath = /^\/./.test(path) ? path : `/${path}`
  return `${process.env.API_BASE_URL}${standardizedPath}`
}
