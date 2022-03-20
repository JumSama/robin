<template>
  <teleport to="#back">
    <div class="screen" :style="{ backgroundColor: loddingBg || '' }">
      <div class="spinner-border text-primary lodding-center" role="status">
        <span class="visually-hidden">{{ loddingText || 'Lodding' }}</span>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    loddingBg: {
      type: String,
      default: 'rgba(100, 100, 100, 0.5)'
    },
    loddingText: {
      type: String,
      default: '加载中...'
    }
  }
})
</script>

<style>
.lodding-center {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.screen {
  background: rgba(100, 100, 100, 0.5);
  z-index: 100;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
