### Main Guide for typescript, svelte, prettier, and linting
- https://codechips.me/eslint-svelte-typescript

### Adding scss
- https://dev.to/mefaba/how-to-use-scss-with-svelte-4c6o
- https://daveceddia.com/svelte-with-sass-in-vscode/

#### Svelte with TS
- https://svelte.dev/blog/the-easiest-way-to-get-started
- https://www.typescriptlang.org/download
- you can use rollup instead of webpack by leaving off the webpack in the npx command

```
npx degit sveltejs/template svelte-template
cd svelte-template
node scripts/setupTypeScript.js
npm install
```

#### Prettier
```
npm add -D prettier prettier-plugin-svelte
```
- add/modify .prettierrc.js
- modify tsconfig.json

#### Linting
- https://github.com/sveltejs/eslint-plugin-svelte3
- https://eslint.org/docs/user-guide/getting-started
```
npm add -D eslint eslint-plugin-svelte3
npm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
- add modify .eslintrc.js

#### Modify settings
- modify package.json

#### scss
```
npm install -D svelte-preprocess
npm install -D sass

```

### Example .svelte component:
```
<script lang="ts">
</script>

<style lang="scss">
</style>
```