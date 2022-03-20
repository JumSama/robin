<template>
  <div class="mx-auto p-3 w-666">
    <div class="login-page">
      <div class="login-part">
        <validate-form @form-submit="onFormSubmit">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
            <validate-input
              type="text"
              :rules="emailRules"
              v-model="emailVal"
              placeholder="请输入您的邮箱地址"
              ref="inputEmailRef"
            ></validate-input>
          </div>
          <div class="mb-3 text-left">
            <label for="exampleInputPassword1" class="form-label">密码</label>
            <validate-input
              type="password"
              placeholder="请输入您的正确密码"
              v-model="pswVal"
              :rules="pswRules"
              ref="inputPswRef"
            ></validate-input>
          </div>
          <template #submit>
            <span class="btn btn-primary w-50">登陆</span>
          </template>
        </validate-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/VaildateForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '../hooks/createMessage'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const inputEmailRef = ref()
    const inputPswRef = ref()
    const emailVal = ref('')
    const pswVal = ref('')
    const pswRules: RulesProp = [
      { type: 'required', message: '密码不能为空!' },
      { type: 'length', message: '密码长度为8-16位!' }
    ]
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空！' },
      { type: 'email', message: '请正确输入邮箱地址！' }
    ]
    const onFormSubmit = (result: boolean) => {
      // 不仅在失去焦点的情况下触发规则,在提交的时候也需要再次验证规则
      if (result) {
        const payload = {
          email: emailVal.value,
          password: pswVal.value
        }
        store
          .dispatch('loginAndFetch', payload)
          .then((res) => {
            createMessage('登陆成功,两秒后跳转至首页!', 'success')
            setTimeout(() => {
              router.push('/')
            }, 2000)
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        inputEmailRef.value.inputRef.val = ''
        inputPswRef.value.inputRef.val = ''
        emailVal.value = ''
        pswVal.value = ''
      }
    }
    return {
      pswVal,
      pswRules,
      emailRules,
      emailVal,
      onFormSubmit,
      inputEmailRef,
      inputPswRef
    }
  }
})
</script>

<style scoped>
.w-666 {
  max-width: 666px;
}
.login-page {
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 10px;
  padding: 50px;
  box-shadow: 1px 1px 2px #888888;
}
.login-part {
  width: 100%;
}

.img-part {
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.img-part img {
  width: 100%;
  height: 100%;
}
</style>
