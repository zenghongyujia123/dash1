<script setup lang="ts">
import { SelectIcon } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

defineProps<{
  asChild?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SelectIcon v-bind="$props">
    <slot />
  </SelectIcon>
</template>