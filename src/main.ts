import { createApp } from 'vue';
import App from './App.vue';
import DKToast from './lib/toast';

const app = createApp(App);

app.use(DKToast, {
  // duration: false,
  positionX: 'center',
  positionY: 'top',
  class: 'toast',
  max: 10,
  styles: { color: 'red' }
});

app.mount('#app');
