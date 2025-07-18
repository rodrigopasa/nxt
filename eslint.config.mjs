// eslint.config.mjs
import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  js.configs.recommended,
  ...next,
  {
    rules: {
      // Desativa a regra que bloqueia o uso de 'any'
      '@typescript-eslint/no-explicit-any': 'off',
      // Outras regras podem ser ajustadas aqui se necessário
    },
  },
];
