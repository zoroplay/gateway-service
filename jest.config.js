// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript
    testEnvironment: 'node', // Set the test environment to Node.js
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.test.json', // Path to your temporary tsconfig for tests
      },
    },
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Adjust according to your directory structure if needed
    },
  
  };
  