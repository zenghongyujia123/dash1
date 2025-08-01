<script setup lang="ts">
import { ClientOnly } from '#components'
import NumberFlow from '@number-flow/vue'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-vue-next'

// SEO配置
useHead({
  title: 'Dashboard Overview',
  meta: [
    {
      name: 'description',
      content: 'Real-time dashboard showing key metrics including revenue, subscriptions, sales, and active users. Monitor your business performance with interactive charts and recent sales data.'
    },
    {
      name: 'keywords',
      content: 'dashboard, analytics, revenue tracking, sales monitoring, business metrics, real-time data'
    },
    // Open Graph
    {
      property: 'og:title',
      content: 'Dashboard Overview - Real-time Business Metrics'
    },
    {
      property: 'og:description',
      content: 'Real-time dashboard showing key metrics including revenue, subscriptions, sales, and active users. Monitor your business performance with interactive charts and recent sales data.'
    },
    // Twitter
    {
      name: 'twitter:title',
      content: 'Dashboard Overview - Real-time Business Metrics'
    },
    {
      name: 'twitter:description',
      content: 'Real-time dashboard showing key metrics including revenue, subscriptions, sales, and active users. Monitor your business performance with interactive charts and recent sales data.'
    }
  ]
})

const dataCard = ref({
  totalRevenue: 45231.89,
  totalRevenueDesc: 20.1 / 100,
  subscriptions: 2350,
  subscriptionsDesc: 180.5 / 100,
  sales: 12234,
  salesDesc: 45 / 100,
  activeNow: 573,
  activeNowDesc: 201,
})

const dataRecentSales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: 1999,
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: 39,
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: 299,
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: 99,
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: 39,
  },
]

onMounted(() => {
  dataCard.value = {
    totalRevenue: 45231.89,
    totalRevenueDesc: 20.1 / 100,
    subscriptions: 2350,
    subscriptionsDesc: 180.5 / 100,
    sales: 12234,
    salesDesc: 45 / 100,
    activeNow: 573,
    activeNowDesc: 201,
  }
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        1234
      </h2>
      <div class="flex items-center space-x-2">
        <BaseDateRangePicker />
        <Button>Download</Button>
      </div>
    </div>
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.totalRevenue"
                  :format="{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }"
                />
              </ClientOnly>
            </div>
            <p class="text-xs text-muted-foreground">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.totalRevenueDesc"
                  prefix="+"
                  :format="{ style: 'percent', minimumFractionDigits: 1 }"
                />
              </ClientOnly>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.subscriptions"
                  prefix="+"
                />
              </ClientOnly>
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.subscriptionsDesc"
                prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Sales
            </CardTitle>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.sales"
                  prefix="+"
                />
              </ClientOnly>
            </div>
            <p class="text-xs text-muted-foreground">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.salesDesc"
                  prefix="+"
                  :format="{ style: 'percent', minimumFractionDigits: 1 }"
                />
              </ClientOnly> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Active Now
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.activeNow"
                  prefix="+"
                />
              </ClientOnly>
            </div>
            <p class="text-xs text-muted-foreground">
              <ClientOnly>
                <NumberFlow
                  :value="dataCard.activeNowDesc"
                  prefix="+"
                />
              </ClientOnly> since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <Card class="xl:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent class="pl-2">
            <DashboardOverview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <div
              v-for="recentSales in dataRecentSales" :key="recentSales.name"
              class="flex items-center gap-4"
            >
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarFallback>{{ recentSales.name.split(' ').map((n) => n[0]).join('') }}</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  {{ recentSales.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ recentSales.email }}
                </p>
              </div>
              <div class="ml-auto font-medium">
                <ClientOnly>
                  <NumberFlow
                    :value="recentSales.amount"
                    :format="{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }"
                    prefix="+"
                  />
                </ClientOnly>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>