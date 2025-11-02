module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@/domain/(.*)$': '<rootDir>/domain/$1',
    '^@/application/(.*)$': '<rootDir>/application/$1',
    '^@/infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
  },
};