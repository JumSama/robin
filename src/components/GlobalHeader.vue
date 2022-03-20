<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">知更鸟</a>
    <ul v-if="userInfo && !userInfo.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登陆</router-link
        >
      </li>
      <li class="list-inline-item">
        <router-link to="/register" class="btn btn-outline-light my-2"
          >注册</router-link
        >
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好， ${userInfo.nickName}`">
          <dropdown-item
            ><button class="dropdown-item" type="button">
              新建文章
            </button></dropdown-item
          >
          <dropdown-item :disabled="true"
            ><button class="dropdown-item" type="button">
              编辑资料
            </button></dropdown-item
          >
          <dropdown-item
            ><button class="dropdown-item" type="button">
              退出登陆
            </button></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
// import { UserProps } from '../store/index'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  setup() {
    const store = useStore()
    const userInfo = computed(() => store.state.user)
    return {
      userInfo
    }
  }
})
</script>
