import type { Config } from 'jest';
process.env.JWT_SECRET = 'asfasfhk1';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
};

export default config;