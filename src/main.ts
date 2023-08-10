import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// RESETS

document.ondblclick = function (e) {
  e.preventDefault()
}

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
