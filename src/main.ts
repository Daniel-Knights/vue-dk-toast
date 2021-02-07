import { createApp } from 'vue'
import App from './App.vue'
import DKToast from './lib/toast'

const app = createApp(App)

app.use(DKToast, {
    duration: 10000,
    // positionY: 'top',
    positionX: 'right'
    // styles: { border: '10px solid' },
})

app.mount('#app')
