<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="columnList"
    >
      <div class="col-3 text-center">
        <img
          :src="columnList.avatar.url"
          :alt="columnList.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ columnList.title }}</h4>
        <p class="text-muted">{{ columnList.description }}</p>
      </div>
    </div>
    <post-list :postData="postList"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import PostList from '../components/PostList.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalDataProps } from '../store/index'
export default defineComponent({
  components: {
    PostList
  },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentColumnId = route.params.id // +号转为number型
    onMounted(() => {
      store.dispatch('fetchColumn', currentColumnId)
      store.dispatch('fetchPosts', currentColumnId)
    })
    const columnList = computed(() =>
      store.getters.getColumnById(currentColumnId)
    )
    const postList = computed(() => store.getters.getPostById(currentColumnId))
    console.log(postList)
    return {
      columnList,
      postList
    }
  }
})
</script>
