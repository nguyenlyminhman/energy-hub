import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>/test'],
  testRegex: '.e2e-spec.ts$',

  setupFilesAfterEnv: [
    '<rootDir>/src/config/jest-e2e.setup.ts',
  ],

  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths ?? {},
    { prefix: '<rootDir>/' },
  ),
};

export default config;
