import { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Поддержка алиасов @/
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Для работы с CSS
  },
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
