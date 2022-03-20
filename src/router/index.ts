import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '@/views/Home.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import Register from '@/views/Register.vue'
import store from '@/store'
import axios from 'axios'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      component: ColumnDetail,
      name: 'ColumnDetail'
    },
    {
      path: '/createpost',
      component: CreatePost,
      name: 'CreatePost',
      meta: { requiredLogin: true }
    },
    {
      path: '/register',
      component: Register,
      name: 'Register'
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostDetail.vue'),
      name: 'PostDetail'
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  // 刷新 进入这里 user.isLogin == false
  if (!user.isLogin) {
    // 如果token存在则尝试登陆
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store
        .dispatch('fetchCurrentUser')
        .then(() => {
          // 获取用户信息成功 isLogin == true
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        })
        .catch((e) => {
          console.error(e)
          store.commit('logout')
          next('login')
        })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
