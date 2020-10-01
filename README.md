# vue-dk-toast

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
