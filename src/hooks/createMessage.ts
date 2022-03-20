import { createApp } from 'vue'
import Message from '../components/Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (
  message: string,
  type: MessageType,
  timeout = 2000
): void => {
  // 第一个参数是创建的组件 第二个参数是组件的属性
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
