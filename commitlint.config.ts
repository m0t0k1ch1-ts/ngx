import { defineConfig } from 'czg';

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  prompt: {
    scopes: [
      "apps/playground",
      "libs/ngx",
    ],
  },
});
