# vue-dk-toast

Lightweight toast-notification plugin for Vue3.

## Install

```bash
npm i vue-dk-toast
```

## Import

```js
import { createApp } from 'vue';
import App from './App.vue';
import DKToast from 'vue-dk-toast';

createApp(App)
    .use(DKToast)
    .mount('#app');
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
    styles: {
        borderRadius: '25px',
    },
});
```
