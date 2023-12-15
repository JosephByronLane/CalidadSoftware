module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: false,
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}', // Adjust the pattern to match your source files
      '!**/node_modules/**',
      '!**/vendor/**'
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/*.js' 
    ],
    testMatch: [
      '**/?(*.)+(spec|test).ts?(x)' // Matches .spec.ts, .test.ts, .spec.tsx, .test.tsx
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: '<rootDir>/coverage',
  };