# `vue-dk-toast`

> _Lightweight toast-notification plugin for Vue 3_ 🍞

[![npm](https://img.shields.io/npm/v/vue-dk-toast.svg)](https://www.npmjs.com/package/vue-dk-toast)
[![vue](https://img.shields.io/badge/vue-3.x-brightgreen)](https://v3.vuejs.org/)

- _Lightweight_ ☁️
- _Customizable_ 🧰
- _Easy to use_ 🥷
- _Mobile-friendly_ 📱
- _Built-in TypeScript support_ 🔒
- _A11y compliant_ 🧑‍🦯

---

[**Demo**](https://vue-dk-toast.netlify.app/) \
[**CodePen Demo**](https://codepen.io/daniel-knights/pen/NWbjRZZ)

- [`vue-dk-toast`](#vue-dk-toast)
  - [Install](#install)
  - [Import](#import)
  - [Usage](#usage)
  - [Options](#options)
  - [Local Options](#local-options)
  - [TypeScript Support](#typescript-support)
  - [Security](#security)

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
<script src="https://unpkg.com/vue-dk-toast@2.0.6"></script>
```

## Import

CLI

```js
import { createApp } from 'vue';
import App from './App.vue';
import DKToast from 'vue-dk-toast';

createApp(App).use(DKToast).mount('#app');
```

CDN

```js
const app = Vue.createApp({});

app.use(DKToast);
app.mount('#app');
```

## Usage

**Options API:**

```js
this.$toast('Simple!');
```

_or..._

```js
@click="$toast('Simple!')"
```

**Composition API:**

```vue
<script>
import { inject } from 'vue';

export default {
  setup() {
    const toast = inject('$toast');

    toast('Simple!');
  },
};
</script>
```

## Options

| Option         | Type      | Default  | Description                                                                                    |
| -------------- | --------- | -------- | ---------------------------------------------------------------------------------------------- |
| `class`        | `String`  | None     | Custom CSS class to be added to every toast (alongside `.dk__toast`).                          |
| `disableClick` | `Boolean` | `false`  | Disable toast removal on click.                                                                |
| `duration`     | `Number`  | `5000`   | Milliseconds before hiding toast.                                                              |
| `max`          | `Number`  | None     | Max number of toasts allowed on the page at any one time. Removes oldest existing toast first. |
| `positionX`    | `String`  | `right`  | Position of container on the X axis - `'left'`, `'right'` or `'center'`.                       |
| `positionY`    | `String`  | `bottom` | Position of container on the Y axis - `'top'`, or `'bottom'`.                                  |
| `styles`       | `Object`  | None     | CSS key/value pairs - supports vendor prefixes.                                                |

**EXAMPLE:**

```js
createApp(App)
  .use(DKToast, {
    duration: 5000,
    positionY: 'bottom', // 'top' or 'bottom'
    positionX: 'right', // 'left', 'right' or 'center'
    disableClick: true,
    styles: {
      color: '#000',
      backgroundColor: '#fff',
      // Vendor prefixes also supported
    },
    class: 'custom-class', // Added to each toast,
    max: 10,
  })
  .mount('#app');
```

## Local Options

| Option         | Type                                      | Default  | Description                                                                                                  |
| -------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `class`        | `String`                                  | None     | CSS class to be added to this toast only (alongside `.dk__toast` **and** any globally set custom-class).     |
| `disableClick` | `Boolean`                                 | `false`  | Disable individual toast removal on click.                                                                   |
| `duration`     | `Number`                                  | `5000`   | Milliseconds before hiding toast. Overrides global `duration`.                                               |
| `link`         | `{ href: string, targetBlank?: boolean }` | none     | Turns the toast into an `<a>` element which has a `href` of the one provided and optional `target="_blank"`. |
| `positionX`    | `String`                                  | `right`  | Position of container on the X axis - `'left'`, `'right'` or `'center'`. Overrides global `positionX`.       |
| `positionY`    | `String`                                  | `bottom` | Position of container on the Y axis - `'top'`, or `'bottom'`. Overrides global `positionY`.                  |
| `slotLeft`     | `String`                                  | None     | Any valid HTML as a string. Displays left of text.                                                           |
| `slotRight`    | `String`                                  | None     | Any valid HTML as a string. Displays right of text.                                                          |
| `styles`       | `Object`                                  | None     | CSS key/value pairs. Supports vendor prefixes.                                                               |
| `type`         | `String`                                  | None     | Default helper class - `success`, `error` or `passive`.                                                      |

**EXAMPLE:**

```js
this.$toast('Simple!', {
  duration: 1000,
  styles: {
    borderRadius: '25px',
  },
  link: {
    href: 'https://vue-dk-toast.netlify.app/',
    targetBlank: true,
  },
  // Any valid HTML, intended for icons
  slotLeft: '<i class="fa fa-user"></i>', // Add icon to left
  slotRight: '<i class="fa fa-thumbs-up"></i>', // Add icon to right
  class: 'local-class', // Added to this toast only
  type: 'success', // Default classes: 'success', 'error' and 'passive'
  positionX: 'center',
  positionY: 'top',
  disableClick: true,
});
```

## TypeScript Support

**`vue-dk-toast`** comes with it's own built-in types for most cases, the exception being with the Composition API:

```vue
<script lang="ts">
import { defineComponent, inject } from 'vue';
import type { Toast } from 'vue-dk-toast';

export default defineComponent({
  setup() {
    const toast = inject<Toast>('$toast');

    if (toast) toast('Simple!');
  },
});
</script>
```

## Security

For `slotRight` and `slotLeft` to work, it uses `innerHTML` to set the content. `innerHTML` is not secure as it adds the possibility for XSS attacks. If you set any user-inputted tags with these options, make sure you sanitise the string beforehand, else, adding something like `<img src=x onerror="alert("XSS Attack!")" />` would run. You can use a library like [`DOMPurify`](https://www.npmjs.com/package/dompurify) to handle this for you.

---

**Contributions welcome!**
