import { createApp } from 'vue';
import App from './App.vue';
import DKToast from './toast';

createApp(App)
	.use(DKToast)
	.mount('#app');
