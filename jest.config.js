// jest.config.js
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' }); // Chargez les variables d'environnement depuis le fichier .env.test

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], 
  setupFilesAfterEnv: [`${__dirname}/test/setup.js`],
};
