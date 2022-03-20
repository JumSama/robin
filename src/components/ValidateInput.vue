<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @input="updateValue"
      @blur="ValidateInput"
      v-bind="$attrs"
      required
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @input="updateValue"
      @blur="ValidateInput"
      v-bind="$attrs"
      required
    ></textarea>
    <span class="invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter, ValidateFunc } from './VaildateForm.vue'
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export interface RuleProp {
  type: 'required' | 'email' | 'length' | 'custom'
  message: string
  validator?: () => boolean
}
// 表面是RuleProp类型的数组
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  // 不继承，因为继承会把父组件设置的属性默认添加到子组件的root结点上 $attrs上是父组件设置的属性 使用v-bind 在子组件的input上绑定父组件设置的属性
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    // 默认v-model 如果是test的话则 v-model:test，之后要发送事件emit(update:test)
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // @input 触发事件 输入时触发  用于父子之间v-model绑定
    // e 设置什么类型都ok InputEvent MouseEvent都ok
    const updateValue = (e: KeyboardEvent) => {
      // 获取input组件的值
      const targetValue = (e.target as HTMLInputElement).value
      // 给绑定的val赋值
      inputRef.val = targetValue
      // 父组件绑定的是emailVal 发送update事件之后传入要更新的值 targetValue 实现父子间通信
      context.emit('update:modelValue', targetValue)
    }
    // 通过blur离开输入框 和 submit事件调用
    const ValidateInput: ValidateFunc = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'length':
              passed = inputRef.val.length >= 6 && inputRef.val.length <= 16
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return false
    }
    onMounted(() => {
      emitter.emit('form-item-created', ValidateInput)
    })
    return {
      inputRef,
      ValidateInput,
      updateValue
    }
  }
})
</script>
