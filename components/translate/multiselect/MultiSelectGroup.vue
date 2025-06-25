<template>
  <div class="group-container">
    <div class="px-2 py-1.5 text-sm font-semibold text-foreground/50">
      {{ label }}
    </div>
    <ul class="group-items">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style scoped>
.group-container {
  position: relative;
}

.group-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>