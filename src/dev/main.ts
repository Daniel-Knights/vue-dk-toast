import { createApp } from 'vue';
import DKToast from '../lib/toast';
import type { Options } from '../lib/toast.d';
import App from './App.vue';

const app = createApp(App);

console.log(window.DKToast);
const options: Options = {
  duration: false,
  positionX: 'center',
  positionY: 'top',
  class: ['toast', 'test'],
  max: 10,
  styles: { color: 'red' },
};

app.use(window.DKToast || DKToast, options);
app.mount('#app');
