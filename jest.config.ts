import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['**/*.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/types/'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc-node/jest',
      {
        jsc: {
          minify: false
        }
      }
    ]
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageProvider: 'v8',
  coverageReporters: ['text']
}

export default config
