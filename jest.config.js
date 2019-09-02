module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'tsx','js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'ts-jest'
  },
  globals: {
    "ts-jest": {
      "tsConfig": "./tsconfig.json"
    }
  },
  testMatch: [
    "**/test/**/*.spec.ts"
  ],
  'collectCoverage': true,
  'collectCoverageFrom': [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ]
}
