<script setup lang="ts">
const data = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 3000 },
  { name: 'Mar', total: 5000 },
  { name: 'Apr', total: 2780 },
  { name: 'May', total: 1890 },
  { name: 'Jun', total: 2390 },
  { name: 'Jul', total: 3490 },
  { name: 'Aug', total: 4000 },
  { name: 'Sep', total: 4800 },
  { name: 'Oct', total: 3908 },
  { name: 'Nov', total: 4300 },
  { name: 'Dec', total: 5100 },
]
</script>

<template>
  <BarChart :data="data" :categories="['total']" index="name" :rounded-corners="4" />
</template>