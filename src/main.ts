import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
createApp(App).use(router).use(store).mount('#app')
// axios全局拦截器
axios.interceptors.request.use((config) => {
  store.commit('setLodding', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(
  (response) => {
    store.commit('setLodding', false)
    return response
  },
  (e) => {
    const { error } = e.response.data
    store.commit('setError', { status: true, message: e.response.data.error })
    store.commit('setLodding', false)
    return Promise.reject(error)
  }
)
