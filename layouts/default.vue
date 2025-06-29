<script setup lang="ts">
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <ToastProvider>
    <SidebarProvider>
    <!-- <LayoutAppSidebar /> -->
    <SidebarInset>
      <LayoutHeader />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <slot />
      </div>
    </SidebarInset>
    </SidebarProvider>
    <Toaster />
  </ToastProvider>
</template>

<style scoped>

</style>