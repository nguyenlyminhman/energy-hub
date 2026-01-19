import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>/src'],

  testRegex: '.*\\.int\\.spec\\.ts$',

  setupFilesAfterEnv: [
    '<rootDir>/src/config/jest-int.setup.ts',
  ],

  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>/' },
  ),
};
