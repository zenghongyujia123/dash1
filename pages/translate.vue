<script setup lang="ts">

import { accounts, mails } from '@/components/mail/data/mails'
</script>

<template>
  <div class="-m-4 lg:-m-6 h-full">
    <TranslateLayout
      :accounts="accounts"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </div>
</template>
