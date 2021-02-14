import { createApp } from 'vue'
import App from './App.vue'
import DKToast from './lib/toast'

const app = createApp(App)

app.use(DKToast, {
    duration: false,
    positionY: 'bottom',
    positionX: 'center',
    class: 'toast',
    max: 10
})

app.mount('#app')
