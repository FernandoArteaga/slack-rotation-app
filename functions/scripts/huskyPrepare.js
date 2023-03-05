const isCi = process.env.CI !== undefined
const isFirebase = process.env.GOOGLE_FUNCTION_TARGET !== undefined
if (!isCi && !isFirebase) {
  process.chdir('..')
  /* eslint-disable @typescript-eslint/no-var-requires */
  require('husky').install('functions/.husky')
}