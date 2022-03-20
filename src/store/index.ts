import axios from 'axios'
import { createStore, Commit } from 'vuex'

export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: number
  column?: string
  email?: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createAt?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface PostProps {
  _id: number
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt: string
  column: string
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  token: string
  lodding: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  error: GlobalErrorProps
}

const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  payload: any
) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    // 数据仓库
    error: { status: false },
    token: localStorage.getItem('token') || '',
    lodding: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    // 修改state值
    // passLogin (state) { 伪数据
    //   state.user = { ...state.user, id: 1, name: 'Jum', isLogin: true, columnId: '1' }
    // },
    createPost(state, post) {
      state.posts.push(post)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLodding(state, status) {
      state.lodding = status
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    login(state, rawData) {
      const { token } = rawData.data
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem('token', token)
      state.token = rawData.data.token
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    logout(state) {
      state.token = ''
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  getters: {
    columnHandleData(state) {
      state.columns.map((column) => {
        if (!column.avatar) {
          column.avatar = {
            url: require('../assets/logo.png')
          }
        }
        return column
      })
      return state.columns
    },
    postsImageHandle(state) {
      state.posts.map((post) => {
        if (!post.image) {
          post.image = {
            url: require('../assets/logo.png')
          }
        }
        return post
      })
      return state.columns
    },
    // 以点击专栏传送的专栏ID取得专栏详情
    getColumnById: (state) => (columnId: string) => {
      return state.columns.find((pre) => pre._id === columnId)
    },
    // 根据专栏ID获取文章数据
    getPostById: (state) => (columnId: string) => {
      return state.posts.filter((pre) => pre.column === columnId)
    }
  },
  // 可处理异步请求
  actions: {
    fetchColumns({ commit }) {
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    // 登陆成功的同时获取当前用户的信息
    fetchCurrentUser({ commit }) {
      getAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
    },
    // 组合action，同时触发两个action
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }
})

export default store
