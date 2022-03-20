<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="triggerUpload"
    />
    <h4>图片预览:</h4>
    <div @click="triggerUploadPage">
      <img v-if="status === 'success'" :src="imageUrl" class="upload-img" />
      <span v-else-if="status === 'ready'" class="d-img">点击上传图片</span>
      <span v-else-if="status === 'loadding'" class="d-img">上传文件中...</span>
      <span v-else-if="status === 'error'" class="d-img">上传失败</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
// import axios from 'axios'
// import createMessage from '../hooks/createMessage'
type uploadStatusType = 'error' | 'success' | 'loadding' | 'ready'
export default defineComponent({
  emits: ['triggerUpload'],
  props: {
    uploadImageUrl: String,
    uploadStatus: {
      type: String as PropType<uploadStatusType>
    }
  },
  setup(props, context) {
    const fileInput = ref()
    const status = ref<uploadStatusType>('ready')
    const uploadImg = ref(null)
    const imageUrl = ref()
    const triggerUploadPage = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const triggerUpload = (e: Event) => {
      context.emit('triggerUpload', e)
    }
    // 监听图片信息改变
    watch(
      () => props.uploadImageUrl,
      (newValue) => {
        if (newValue) {
          imageUrl.value = newValue
        }
      }
    )
    // 监听状态改变
    watch(
      () => props.uploadStatus,
      (newValue) => {
        if (newValue) {
          status.value = newValue
        }
      }
    )
    return {
      triggerUploadPage,
      fileInput,
      triggerUpload,
      status,
      uploadImg,
      imageUrl
    }
  }
})
</script>

<style scoped>
.upload-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.d-img {
  width: 100%;
  height: 200px;
  display: block;
  background-color: gray;
  text-align: center;
  font-size: 50px;
  line-height: 200px;
}
</style>
