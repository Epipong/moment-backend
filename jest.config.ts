import type { Config } from '@jest/types';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: '.',
  roots: ['src'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: [`${__dirname}/test/setup.js`],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
