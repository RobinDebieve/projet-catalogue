/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // Indique à jest d'utiliser ts-jest pour compiler les fichiers TypeScript
  preset: 'ts-jest',
  
  // Indique le type d'environnement dans lequel tourneront les tests (DOM, Node, etc.)
  testEnvironment: "jest-environment-jsdom",

  // Chemin de base pour les tests
  // (optionnel si tu mets tes tests dans __tests__ ou si tu as une autre convention)
  roots: ['<rootDir>/src'],

  // Cherche tous les fichiers .test.ts ou .spec.ts
  testMatch: ['**/__tests__/**/*.test.ts'],

  // Si besoin, configurer les chemins alias, etc.
  // Par exemple si tu utilises "paths" dans tsconfig.json.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
};
