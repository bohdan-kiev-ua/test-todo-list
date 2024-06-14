/** @type {import('ts-jest').JestConfigWithTsJest} */
// const { compilerOptions } = require('./tsconfig');
// const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '\\.[jt]sx?$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.jest.json',
            },
        ],
    },
    setupFilesAfterEnv: ['./src/jest.setup.ts'],
};
