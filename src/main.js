import { createApp } from 'vue';
import App from './App.vue';
import DKToast from './toast';

const app = createApp(App);

app.use(DKToast, {
    duration: 10000,
    styles: { border: '10px solid' },
});
app.mount('#app');
