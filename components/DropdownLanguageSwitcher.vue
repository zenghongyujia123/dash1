<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <Icon name="i-lucide-languages" class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Select Language</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="setLocale('en')">
        <span class="mr-2">🇬🇧</span> English
      </DropdownMenuItem>
      <DropdownMenuItem @click="setLocale('zh')">
        <span class="mr-2">🇨🇳</span> 中文
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>