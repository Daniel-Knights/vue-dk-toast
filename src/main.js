import { createApp } from 'vue';
import App from './App.vue';
import DKToast from './toast';

createApp(App)
    .use(DKToast, {
        duration: 1000,
        positionX: 'left',
        positionY: 'bottom',
    })
    .mount('#app');
