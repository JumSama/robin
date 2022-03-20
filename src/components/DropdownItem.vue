<template>
  <li class="dropdown-options" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
.dropdown-options.is-disabled * {
  color: gray;
  pointer-events: none;
  background-color: transparent;
}
</style>
