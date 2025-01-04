module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Simule un environnement de navigateur
    roots: ['<rootDir>/src'], // Répertoire des fichiers source
    moduleFileExtensions: ['ts', 'js'], // Extensions supportées
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transforme les fichiers TypeScript
    },
    testMatch: ['**/__tests__/**/*.test.ts'], // Fichiers de test ciblés
  };
  