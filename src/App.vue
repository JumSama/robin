<template>
  <div class="container">
    <lodding
      v-if="isShow"
      loddingText="正在加载中,请稍等..."
      loddingBg="rgba(0, 0, 0, 0.8)"
    ></lodding>
    <global-header></global-header>
    <router-view></router-view>
    <!-- <column-list :list="list"></column-list> -->
    <global-footer></global-footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import createMessage from './hooks/createMessage'
import Lodding from './components/Lodding.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    GlobalFooter,
    Lodding
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    // // 验证token
    // if (store.state.token !== '' && !store.state.user.isLogin) {
    //   // 请求时 请求头默认带上token
    //   axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`
    //   store.dispatch('fetchCurrentUser')
    //   console.log('token验证')
    // }
    const isShow = computed(() => store.state.lodding) // 加载
    const error = computed(() => store.state.error) // 错误
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value
        if (status && message) {
          createMessage(message, 'error')
        }
      }
    )
    return {
      isShow,
      error
    }
  }
})
</script>
