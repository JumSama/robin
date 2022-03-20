<template>
  <div v-if="postData">
    <div class="card mb-3 shadow-sm" v-for="post in postData" :key="post._id">
      <div class="row g-0">
        <div class="col-4">
          <img
            :src="post.image && post.image.url"
            class="img-fluid rounded-start"
            :alt="post.title"
          />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">
              <router-link to="/post/123">{{ post.title }}</router-link>
            </h5>
            <p class="card-text">{{ post.excerpt }}</p>
            <p class="card-text">
              <small class="text-muted">{{ post.createdAt }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, nextTick } from 'vue'
import { PostProps } from '../store/index'

export default defineComponent({
  props: {
    postData: {
      type: Array as PropType<PostProps[]>
    }
  },
  setup(props) {
    onMounted(() => {
      nextTick(() => {
        console.log(props.postData)
      })
    })
  }
})
</script>
