export const fatal = (reason: string): never => {
  // eslint-disable-next-line functional/no-throw-statement
  throw new Error(reason)
}
