module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}', // Adjust the pattern to match your source files
      '!**/node_modules/**',
      '!**/vendor/**'
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: '<rootDir>/coverage',
  };