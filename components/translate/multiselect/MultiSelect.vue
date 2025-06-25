<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import MultiSelectGroup from './MultiSelectGroup.vue'
import { Icon } from '#components'

interface Option {
  value: string
  label: string
}

interface OptionGroup {
  label: string
  items: Option[]
}

// 合并 props 定义
const props = withDefaults(defineProps<{
  modelValue: string[]
  options?: OptionGroup[]
  multiple?: boolean
  placeholder?: string
}>(), {
  options: () => [],
  multiple: true
})

const emits = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const isOpen = ref(false)
const selectedValues = ref(props.modelValue || [])
const searchQuery = ref('')
const dropdownRef = ref<HTMLElement | null>(null)

// 处理点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node) && isOpen.value) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

// 添加和移除事件监听
onMounted(() => {
  // 使用setTimeout确保事件在下一个事件循环中注册
  setTimeout(() => {
    document.addEventListener('mousedown', handleClickOutside)
  }, 0)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const filteredOptions = computed(() => {
  // 如果没有搜索查询，直接返回原始选项
  if (!searchQuery.value) return props.options;

  // 如果有搜索查询，过滤选项
  return props.options.map(group => {
    const filteredItems = group.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    return filteredItems.length > 0 ? {
      label: group.label,
      items: filteredItems
    } : null;
  }).filter(Boolean) as OptionGroup[];
})

// 处理选项选择
function toggleOption(value: string) {
  const index = selectedValues.value.indexOf(value)
  if (index === -1) {
    if (props.multiple) {
      selectedValues.value.push(value)
    } else {
      selectedValues.value = [value]
      isOpen.value = false
    }
  } else {
    selectedValues.value.splice(index, 1)
  }
  emits('update:modelValue', [...selectedValues.value])
}

function toggleDropdown(event: Event) {
  // 阻止事件冒泡
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

// 监听 modelValue 的变化
watchEffect(() => {
  selectedValues.value = props.modelValue || []
})

function getOptionLabel(value: string): string {
  for (const group of props.options) {
    const option = group.items.find(item => item.value === value)
    if (option) {
      return option.label
    }
  }
  return value
}

// 键盘导航支持
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeDropdown()
  }
  // 可以添加更多键盘交互逻辑
}

// 清空选择
function clearSelection(event: Event) {
  event.stopPropagation() // 阻止事件冒泡，避免触发下拉框
  selectedValues.value = []
  emits('update:modelValue', [])
}
</script>

<template>
  <div class="relative" ref="dropdownRef" @click.stop>
    <!-- 触发器 -->
    <div
      class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
      @click="toggleDropdown($event)" @keydown="handleKeydown">
      <div class="flex flex-wrap gap-1 min-w-[120px]">
        <span v-if="selectedValues.length === 0" class="text-muted-foreground">
          {{ placeholder || '目标语言...' }}
        </span>
        <template v-else>
          <span v-for="value in selectedValues" :key="value"
            class="inline-flex items-center rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
            {{ getOptionLabel(value) }}
          </span>
        </template>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="lucide:x" class="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 cursor-pointer"
          v-if="selectedValues.length > 0" @click.stop="clearSelection" />
        <Icon name="i-radix-icons:caret-sort" class="h-4 w-4 shrink-0 opacity-50 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }" />
      </div>
    </div>

    <!-- 下拉菜单 -->
    <div v-if="isOpen"
      class="absolute z-50 mt-1 w-full min-w-[12rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
      <div class="p-1">
        <!-- 搜索框 -->
        <input v-model="searchQuery" type="text" placeholder="搜索..."
          class="mb-1 h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          @click.stop>
        <ScrollArea class="h-72 rounded-md">

          <!-- 选项列表 -->
          <div class="">
            <MultiSelectGroup v-for="group in filteredOptions" :key="group.label" :label="group.label">
              <li v-for="option in group.items" :key="option.value"
                class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                @click.stop="toggleOption(option.value)">
                <span v-if="selectedValues.includes(option.value)"
                  class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Icon name="lucide:check" class="h-4 w-4" />
                </span>
                {{ option.label }}
              </li>
            </MultiSelectGroup>
          </div>
        </ScrollArea>

      </div>
    </div>
  </div>
</template>