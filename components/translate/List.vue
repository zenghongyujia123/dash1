<script lang="ts" setup>
import type { Mail } from './data/mails'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface MailListProps {
  items: Mail[]
}

defineProps<MailListProps>()
const selectedMail = defineModel<string>('selectedMail', { required: false })

function getBadgeVariantFromLabel(label: string) {
  if (['work'].includes(label.toLowerCase()))
    return 'default'

  if (['personal'].includes(label.toLowerCase()))
    return 'outline'

  return 'secondary'
}
</script>

<template>
  <ScrollArea class="h-[calc(100dvh-72px-56px-6rem-53px)] flex">
    <div class="flex flex-1 flex-col gap-2  pt-0">
      <TransitionGroup name="list" appear>
        <button
          v-for="item of items"
          :key="item.id"
          :class="cn(
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            selectedMail === item.id && 'bg-muted',
          )"
          @click="selectedMail = item.id"
        >
          <div class="w-full flex flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">
                  {{ item.name }}
                </div>
                <span v-if="!item.read" class="h-2 w-2 flex rounded-full bg-blue-600" />
              </div>
              <div
                :class="cn(
                  'ml-auto text-xs',
                  selectedMail === item.id
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )"
              >
                {{ formatDistanceToNow(new Date(item.date), { addSuffix: true }) }}
              </div>
            </div>

            <div class="text-xs font-medium">
              {{ item.subject }}
            </div>
          </div>
          <div class="line-clamp-2 text-xs text-muted-foreground">
            {{ item.text.substring(0, 300) }}
          </div>
          <div class="flex items-center gap-2">
            <Badge v-for="label of item.labels" :key="label" :variant="getBadgeVariantFromLabel(label)">
              {{ label }}
            </Badge>
          </div>
        </button>
      </TransitionGroup>
    </div>
  </ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.list-leave-active {
  position: absolute;
}
</style>
