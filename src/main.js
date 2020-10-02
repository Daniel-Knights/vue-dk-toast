import { createApp } from 'vue';
import App from './App.vue';
import DKToast from './toast';

const app = createApp(App);

app.use(DKToast);
app.mount('#app');
