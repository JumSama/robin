<template>
  <div class="dropdown" ref="dropdownRef">
    <button
      class="btn btn-primary dropdown-toggle border-while border"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click="traggerOpen"
    >
      {{ title }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton1"
      :style="{ display: 'block' }"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false)
    // 把获得的Dom节点传过去
    // 是否点击外部 & 是否打开了下拉菜单
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    const traggerOpen = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      traggerOpen,
      dropdownRef
    }
  }
})
</script>
