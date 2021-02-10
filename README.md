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
-   [Security](#security)

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

It's recommended you use a specific version number to guard against breaking changes and load the script faster:

```html
<script src="https://unpkg.com/vue-dk-toast@1.5.3"></script>
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

```vue
<script>
import { inject } from 'vue'

export default {
    setup() {
        const toast = inject('$toast')

        toast('Simple!')
    }
}
</script>
```

## Options

```js
createApp(App)
    .use(DKToast, {
        duration: 5000,
        positionY: 'bottom', // 'top' or 'bottom'
        positionX: 'right', // 'left', 'right' or 'center'
        styles: {
            color: '#000',
            backgroundColor: '#fff'
            // Vendor prefixes also supported
        },
        class: 'custom-class' // Added to each toast
    })
    .mount('#app')
```

| Option      | Type     | Description                                                              |
| ----------- | -------- | ------------------------------------------------------------------------ |
| `duration`  | `Number` | Milliseconds before hiding toast.                                        |
| `positionY` | `String` | Position of container on the Y axis - `'top'`, or `'bottom'`.            |
| `positionX` | `String` | Position of container on the X axis - `'left'`, `'right'` or `'center'`. |
| `styles`    | `Object` | CSS key/value pairs - supports vendor prefixes.                          |
| `class`     | `String` | CSS class to be added to every toast.                                    |

## Local Options

```js
this.$toast('Simple!', {
    duration: 1000,
    styles: {
        borderRadius: '25px'
    },
    // Any valid HTML, intended for icons
    slotLeft: '<i class="fa fa-user"></i>', // Add icon to left
    slotRight: '<i class="fa fa-thumbs-up"></i>', // Add icon to right
    class: 'local-class', // Added to this toast only
    type: 'success' // Default classes: 'success', 'error' and 'passive'
})
```

| Option      | Type     | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `duration`  | `Number` | Milliseconds before hiding toast. Overrides global duration. |
| `styles`    | `Object` | CSS key/value pairs. Supports vendor prefixes.               |
| `slotLeft`  | `String` | Any valid HTML as a string.                                  |
| `slotRight` | `String` | Any valid HTML as a string.                                  |
| `class`     | `String` | CSS class to be added to this toast only.                    |
| `type`      | `String` | Default helper class - `success`, `error` or `passive`.      |

## TypeScript Support

**`vue-dk-toast`** comes with it's own built-in types for most cases, the exception being with the Composition API:

```vue
<script lang="ts">
import { defineComponent, inject } from 'vue'
import type { Toast } from 'vue-dk-toast'

export default defineComponent({
    setup() {
        const toast = inject<Toast>('$toast')

        if (toast) toast('Simple!')
    }
})
</script>
```

## Security

For `slotRight` and `slotLeft` to work, it uses `innerHTML` to set the content. `innerHTML` is not secure as it adds the possibility for XSS attacks. If you set any user-inputted tags with these options, make sure you sanitise the string beforehand, else, adding something like `<img src=x onerror="alert("XSS Attack!")" />` would run. You can use a library like [`DOMPurify`](https://www.npmjs.com/package/dompurify) to handle this for you.

---

**Contributions welcome!**
