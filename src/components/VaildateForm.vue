<template>
  <form class="validate-form-container" ref="inputFormRef">
    <slot name="default"></slot>
    <div class="submit-area text-center" @click="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">登陆</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
export type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  // emits 可以是数组或对象，对象可以添加验证 2.设置之后获得@form-submit 自定义指令 通过emit可以触发这个指令。并给@form-submit绑定的常量或函数 传参
  emits: ['form-submit'], // 自定义事件
  setup(props, context) {
    let validateFuncs: ValidateFunc[] = []
    const submitForm = () => {
      const result: boolean = validateFuncs
        .map((func) => func())
        .every((res) => res)
      context.emit('form-submit', result)
    }
    const callback = (func: ValidateFunc | any) => {
      validateFuncs.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      validateFuncs = []
    })
    return {
      submitForm,
      callback
    }
  }
})
</script>
