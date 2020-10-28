# vue-dk-toast

Lightweight toast-notification plugin for Vue 3.

[Demo](https://vue-dk-toast.netlify.app/)

## Install

CLI

```bash
npm i vue-dk-toast
```

CDN

```html
<script src="https://unpkg.com/vue-dk-toast@0.1.23/dist/dkToast.umd.min.js"></script>
```

## Import

CLI

```js
import { createApp } from 'vue';
import App from './App.vue';
import DKToast from 'vue-dk-toast';

createApp(App)
    .use(DKToast)
    .mount('#app');
```

CDN

```js
const app = Vue.createApp({});

app.use(DKToast);
app.mount('#app');
```

## Usage

```js
this.$toast('Simple!');
```

```js
@click="$toast('Simple!')"
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
            backgroundColor: '#fff',
            // Vendor prefixes also supported
        },
    })
    .mount('#app');
```

## Local Options

```js
this.$toast('Simple!', {
    duration: 1000,
    // Position not yet supported
    styles: {
        borderRadius: '25px',
    },
    // Any valid HTML, intended for icons
    slotLeft: '<i class="fa fa-user"></i>', // Add icon to left
    slotRight: '<i class="fa fa-thumbs-up"></i>', // Add icon to right
});
```
