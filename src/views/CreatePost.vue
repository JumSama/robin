<template>
  <div class="container">
    <validate-form @form-submit="onFormSubmit">
      <div>
        <up-loader
          @triggerUpload="onLoderChange"
          :uploadImageUrl="uploadImageUrl"
          :uploadStatus="uploadStatus"
        ></up-loader>
      </div>
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <validate-input
          :rules="postTitleRules"
          tag="input"
          type="text"
          v-model="postTitle"
          placeholder="请输入您的文章标题"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情:</label>
        <validate-input
          :rules="postContentRules"
          type="text"
          tag="textarea"
          placeholder="请输入您的文章详情"
          v-model="postDetail"
          rows="10"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-primary">发表文章</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/VaildateForm.vue'
import { GlobalDataProps, PostProps } from '../store/index'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import createMessage from '../hooks/createMessage'
import UpLoader from '../components/UpLoader.vue'
import uploadCheck from '@/utils/uploadCheck'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
    UpLoader
  },
  setup() {
    const route = useRouter()
    const store = useStore<GlobalDataProps>()
    const postTitle = ref()
    const postDetail = ref()
    const uploadStatus = ref('ready')
    const uploadImageUrl = ref('')
    // 表单规则
    const postContentRules: RulesProp = [
      { type: 'required', message: '文章内容不能为空!' }
    ]
    const postTitleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空!' }
    ]
    // 表单提交
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime(),
            title: postTitle.value,
            content: postDetail.value,
            createdAt: new Date().toLocaleTimeString(),
            column: column
          }
          store.commit('createPost', newPost)
        }
        route.push({ name: 'ColumnDetail', params: { id: column } })
      } else {
        console.log('发送失败...')
      }
    }
    // 上传操作
    const onLoderChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      // 验证操作
      if (files) {
        // 验证规则操作
        const isPassCheck = uploadCheck(files, {
          type: ['image/jpeg', 'image/jpg'],
          size: 3
        })
        if (isPassCheck === false) {
          createMessage('请检查上传文件格式!', 'error')
          return
        }
        // 验证通过执行上传逻辑
        uploadStatus.value = 'loadding'
        const uploadedfile = files[0]
        const formData = new FormData()
        formData.append(uploadedfile.name, uploadedfile)
        axios
          .post('/api/upload', formData)
          .then((res) => {
            uploadImageUrl.value = res.data.data.url
            uploadStatus.value = 'success'
            createMessage('上传成功!', 'success')
          })
          .catch(() => {
            uploadStatus.value = 'error'
            createMessage('上传失败!', 'error')
          })
      }
    }
    return {
      postTitle,
      postDetail,
      onFormSubmit,
      postContentRules,
      postTitleRules,
      onLoderChange,
      uploadImageUrl,
      uploadStatus
    }
  }
})
</script>
