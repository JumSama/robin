<template>
  <div class="row text-center">
    <div v-for="column in ColumnsInfo" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <img
            :src="column.avatar.url"
            :alt="column.title"
            class="card-img-top rounded-circle border border-light my-3 w-25"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="text-left introduction">{{ column.description }}</p>
          <router-link
            :to="`/column/${column._id}`"
            class="btn btn-outline-primary"
            >Go Column</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
export default defineComponent({
  name: 'ColumnList',
  props: {},
  setup() {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const ColumnsInfo = computed(() => store.getters.columnHandleData)
    return {
      ColumnsInfo
    }
  }
})
</script>

<style>
.introduction {
  text-align: left;
}
</style>
