# `vue-dk-toast`

> _Lightweight toast-notification plugin for Vue 3_ 🍞

[![npm](https://img.shields.io/npm/v/vue-dk-toast.svg)](https://www.npmjs.com/package/vue-dk-toast)
[![vue](https://img.shields.io/badge/vue-3.x-brightgreen)](https://v3.vuejs.org/)

[Demo](https://vue-dk-toast.netlify.app/)

-   [Install](#install)
-   [Import](#import)
-   [Usage](#usage)
-   [Options](#options)
-   [Local Options](#local-options)
-   [TypeScript Support](#typescript-support)

```
      ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
  ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
▒▒▒▒▒▒░░░░░░░░░░██░░░░░░░░░░░░░░██░░░░░░▒▒
  ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
    ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
    ▒▒▒▒▒▒░░░░░░░░░░░░██████░░░░░░░░▒▒
    ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒
    ██▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒██
  ██▒▒▒▒▒▒░░░░░░░░▒▒░░░░░░░░░░░░░░░░▒▒  ██
██  ▒▒▒▒▒▒░░░░░░░░░░░░░░░░▒▒░░░░░░░░▒▒  ██
██  ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒  ██
██  ▒▒▒▒▒▒░░▒▒░░░░░░░░░░░░░░░░░░▒▒░░▒▒  ██
██  ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒  ██
██  ▒▒▒▒▒▒░░░░░░░░░░░░▒▒░░░░░░░░░░░░▒▒  ██
██  ▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒  ██
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
            ██                ██
            ██                ██
            ██                ██
            ██                ██
            ████              ████
```

## Install

CLI

```bash
npm i vue-dk-toast
```

_or..._

```bash
yarn add vue-dk-toast
```

CDN

```html
<script src="https://unpkg.com/vue-dk-toast"></script>
```

## Import

CLI

```js
import { createApp } from 'vue'
import App from './App.vue'
import DKToast from 'vue-dk-toast'

createApp(App).use(DKToast).mount('#app')
```

CDN

```js
const app = Vue.createApp({})

app.use(DKToast)
app.mount('#app')
```

## Usage

**Options API:**

```js
this.$toast('Simple!')
```

_or..._

```js
@click="$toast('Simple!')"
```

**Composition API:**

```js
import { inject } from 'vue'
...
setup() {
    const toast = inject('$toast')

    toast('Simple!')
}
```

## Options

```js
createApp(App)
    .use(DKToast, {
        duration: 5000,
        positionY: 'bottom', // 'top' or 'bottom'
        positionX: 'right', // 'right' or 'left'
        styles: {
            color: '#000',
            backgroundColor: '#fff'
            // Vendor prefixes also supported
        }
    })
    .mount('#app')
```

## Local Options

```js
this.$toast('Simple!', {
    duration: 1000,
    // Position not yet supported
    styles: {
        borderRadius: '25px'
    },
    // Any valid HTML, intended for icons
    slotLeft: '<i class="fa fa-user"></i>', // Add icon to left
    slotRight: '<i class="fa fa-thumbs-up"></i>' // Add icon to right
})
```

## TypeScript Support

**`vue-dk-toast`** comes with it's own built-in types for most cases, the exception being with the Composition API:

```ts
import { inject } from 'vue'
import type { Toast } from 'vue-dk-toast'
...
setup() {
    const toast = inject<Toast>('$toast')

    if (toast) toast('Simple!')
}

```

---

**Contributions welcome!**
