module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'tests',
    'node_modules', 
    'coverage',
    'src/config',
    'src/app.js',
  ],
  coverageReporters: ['text'/* , 'lcov', 'clover', 'html' */],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
