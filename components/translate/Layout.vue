<script lang="ts" setup>
import type { Mail } from './data/mails'
import type { LinkProp } from '~/components/mail/Nav.vue'
import { useMediaQuery } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [18, 82],
})

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: string
  }[]
  mails: Mail[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

const isCollapsed = ref(props.defaultCollapsed)
const selectedMail = ref<string | undefined>()
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

const filteredMailList = computed(() => {
  let output: Mail[]
  const searchValue = debouncedSearch.value?.trim()
  if (!searchValue) {
    output = props.mails
  }

  else {
    output = props.mails.filter((item) => {
      return item.name.includes(debouncedSearch.value)
        || item.email.includes(debouncedSearch.value)
        || item.name.includes(debouncedSearch.value)
        || item.subject.includes(debouncedSearch.value)
        || item.text.includes(debouncedSearch.value)
    })
  }

  return output
})

const unreadMailList = computed(() => filteredMailList.value.filter(item => !item.read))

const links: LinkProp[] = [
  {
    title: '手动翻译',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'ghost',
  },
  {
    title: 'TXT翻译',
    label: '128',
    icon: 'lucide:square-equal',
    variant: 'default',
  },
  {
    title: 'HTML翻译',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',

  },
  {
    title: 'WORD翻译',
    label: '',
    icon: 'lucide:scroll-text',
    variant: 'ghost',
  },
  {
    title: 'PDF翻译',
    label: '23',
    icon: 'lucide:app-window-mac',
    variant: 'ghost',
  },
  {
    title: 'EXCEL翻译',
    label: '',
    icon: 'lucide:table-properties',
    variant: 'ghost',
  },
  {
    title: '文言文翻译',
    label: '',
    icon: 'lucide:inspection-panel',
    variant: 'ghost',
  },
  {
    title: 'MP3翻译',
    label: '',
    icon: 'lucide:file-audio',
    variant: 'ghost',
  },
  {
    title: 'WAV翻译',
    label: '',
    icon: 'lucide:file-audio-2',
    variant: 'ghost',
  },
  {
    title: 'M4A翻译',
    label: '',
    icon: 'lucide:file-video',
    variant: 'ghost',
  },
]

const links2: LinkProp[] = [
  {
    title: '图片翻译',
    label: '342',
    icon: 'lucide:file-image',
    variant: 'ghost',
  },
]

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}

const defaultCollapse = useMediaQuery('(max-width: 768px)')

watch(() => defaultCollapse.value, () => {
  isCollapsed.value = defaultCollapse.value
})
const lg_arr = ref(
  [
    {
      "first": "A",
      "lgs": [
        "阿拉伯语",
        "爱沙尼亚语",
        "阿塞拜疆语",
        "阿尔巴尼亚语",
        "爱尔兰语",
        "阿姆哈拉语",
        "阿萨姆语",
        "奥里亚语",
        "阿尔及利亚阿拉伯语",
        "阿肯语",
        "阿拉贡语",
        "阿斯图里亚斯语",
        "艾马拉语",
        "奥杰布瓦语",
        "奥克语",
        "奥罗莫语",
        "奥塞梯语"
      ]
    },
    {
      "first": "B",
      "lgs": [
        "波兰语",
        "保加利亚语",
        "波斯语",
        "白俄罗斯语",
        "波斯尼亚语",
        "巴斯克语",
        "冰岛语",
        "北索托语",
        "比斯拉马语",
        "巴什基尔语",
        "巴西葡萄牙语",
        "柏柏尔语",
        "邦板牙语",
        "北方萨米语",
        "本巴语",
        "比林语",
        "俾路支语",
        "博杰普尔语",
        "布列塔尼语"
      ]
    },
    {
      "first": "C",
      "lgs": [
        "聪加语",
        "楚瓦什语"
      ]
    },
    {
      "first": "D",
      "lgs": [
        "德语",
        "丹麦语",
        "迪维希语",
        "德顿语",
        "鞑靼语",
        "低地德语"
      ]
    },
    {
      "first": "E",
      "lgs": [
        "俄语"
      ]
    },
    {
      "first": "F",
      "lgs": [
        "法语",
        "芬兰语",
        "菲律宾语",
        "富拉尼语",
        "法罗语",
        "梵语",
        "弗留利语"
      ]
    },
    {
      "first": "G",
      "lgs": [
        "高棉语",
        "格鲁吉亚语",
        "古吉拉特语",
        "刚果语",
        "瓜拉尼语",
        "格陵兰语",
        "盖尔语",
        "高地索布语",
        "古希腊语",
        "古英语"
      ]
    },
    {
      "first": "H",
      "lgs": [
        "韩语",
        "荷兰语",
        "黑山语",
        "豪萨语",
        "海地语",
        "哈卡钦语",
        "胡帕语"
      ]
    },
    {
      "first": "J",
      "lgs": [
        "捷克语",
        "加泰罗尼亚语",
        "加利西亚语",
        "吉尔吉斯语",
        "加拿大法语"
      ]
    },
    {
      "first": "K",
      "lgs": [
        "克罗地亚语",
        "卡纳达语",
        "科萨语",
        "科西嘉语",
        "库尔德语",
        "孔卡尼语",
        "克什米尔语",
        "卡拜尔语",
        "卡努里语",
        "卡舒比语",
        "康瓦尔语",
        "克里克语",
        "克里米亚鞑靼语",
        "克林贡语",
        "克丘亚语"
      ]
    },
    {
      "first": "L",
      "lgs": [
        "罗马尼亚语",
        "老挝语",
        "拉丁语",
        "立陶宛语",
        "拉脱维亚语",
        "卢森堡语",
        "林加拉语",
        "罗曼什语",
        "拉特加莱语",
        "林堡语",
        "卢干达语",
        "卢森尼亚语",
        "卢旺达语",
        "罗姆语",
        "逻辑语"
      ]
    },
    {
      "first": "M",
      "lgs": [
        "缅甸语",
        "马来语",
        "苗语",
        "孟加拉语",
        "马其顿语",
        "马拉地语",
        "马拉雅拉姆语",
        "马耳他语",
        "毛利语",
        "马拉加斯语",
        "迈蒂利语",
        "马绍尔语",
        "曼克斯语",
        "毛里求斯克里奥尔语"
      ]
    },
    {
      "first": "N",
      "lgs": [
        "挪威语",
        "尼泊尔语",
        "南非荷兰语",
        "南索托语",
        "南恩德贝莱语",
        "那不勒斯语"
      ]
    },
    {
      "first": "P",
      "lgs": [
        "葡萄牙语",
        "普什图语",
        "旁遮普语",
        "帕皮阿门托语"
      ]
    },
    {
      "first": "Q",
      "lgs": [
        "齐切瓦语",
        "契维语",
        "切罗基语"
      ]
    },
    {
      "first": "R",
      "lgs": [
        "日语",
        "瑞典语"
      ]
    },
    {
      "first": "S",
      "lgs": [
        "斯洛文尼亚语",
        "斯洛伐克语",
        "僧伽罗语 ",
        "塞尔维亚语(拉丁文)",
        "塞尔维亚语(西里尔文)",
        "斯瓦希里语",
        "索马里语",
        "萨摩亚语",
        "世界语",
        "苏格兰语",
        "萨丁尼亚语",
        "塞尔维亚-克罗地亚语",
        "掸语",
        "桑海语",
        "书面挪威语",
        "宿务语"
      ]
    },
    {
      "first": "T",
      "lgs": [
        "泰语",
        "土耳其语",
        "泰米尔语",
        "土库曼语",
        "塔吉克语",
        "泰卢固语",
        "他加禄语",
        "提格利尼亚语",
        "突尼斯阿拉伯语"
      ]
    },
    {
      "first": "W",
      "lgs": [
        "乌克兰语",
        "乌尔都语",
        "威尔士语",
        "沃洛夫语",
        "文达语",
        "瓦隆语"
      ]
    },
    {
      "first": "X",
      "lgs": [
        "西班牙语",
        "匈牙利语",
        "希腊语",
        "希伯来语",
        "信德语",
        "修纳语",
        "夏威夷语",
        "叙利亚语",
        "巽他语",
        "西非书面语",
        "西弗里斯语",
        "西里西亚语",
        "希利盖农语",
        "下索布语",
        "新挪威语"
      ]
    },
    {
      "first": "Y",
      "lgs": [
        "英语",
        "越南语",
        "意大利语",
        "印尼语",
        "印地语",
        "亚美尼亚语",
        "约鲁巴语",
        "伊博语",
        "意第绪语",
        "亚齐语",
        "伊多语",
        "伊努克提图特语",
        "因特语",
        "印古什语"
      ]
    },
    {
      "first": "Z",
      "lgs": [
        "中文(简体)",
        "中文(繁体)",
        "中文(粤语)",
        "中文(文言文)",
        "祖鲁语",
        "爪哇语",
        "扎扎其语",
        "中古法语"
      ]
    }
  ]
)
const upload_progress = ref(50)

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files

  if (!files || files.length === 0) {
    console.log('没有选择文件')
    return
  }

  const fileContents: string[] = []
  let filesProcessed = 0

  // 过滤出txt文件
  const txtFiles = Array.from(files).filter(file =>
    file.name.toLowerCase().endsWith('.txt')
  )

  if (txtFiles.length === 0) {
    console.log('没有选择TXT文件')
    return
  }

  // 更新进度条初始值
  upload_progress.value = 0

  txtFiles.forEach((file) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as string
      fileContents.push(content)
      filesProcessed++

      // 更新进度条（只考虑txt文件的数量）
      upload_progress.value = Math.round((filesProcessed / txtFiles.length) * 100)

      // 当所有txt文件都处理完毕时，输出结果
      if (filesProcessed === txtFiles.length) {
        console.log('所有TXT文件内容:', fileContents)
        config.value.contents = fileContents
      }
    }

    reader.onerror = () => {
      console.error(`读取文件 ${file.name} 时出错`)
      filesProcessed++

      // 即使出错也更新进度条
      upload_progress.value = Math.round((filesProcessed / txtFiles.length) * 100)
    }

    // 以文本形式读取文件
    reader.readAsText(file)
  })

  // 如果有非txt文件，输出提示
  const nonTxtFiles = Array.from(files).filter(file =>
    !file.name.toLowerCase().endsWith('.txt')
  )
  if (nonTxtFiles.length > 0) {
    console.log('以下文件不是TXT格式，已跳过：',
      nonTxtFiles.map(f => f.name).join(', ')
    )
  }
}
const config = ref({
  task: 'TXT翻译',
  source_lang: '中文(简体)',
  target_lang: '英语',
  contents: [] as any
})
const upload_loading = ref(false)
const submit = () => {
  console.log(config.value)
  let count = config.value.contents.length
  if (count == 0) {
    return toast({
      title: '提示',
      description: '请选择上传的TXT文件',
      variant: 'destructive'
    });
  }

}
const changeTaS = () => {
  let src = config.value.source_lang
  config.value.source_lang = config.value.target_lang
  config.value.target_lang = src
}
</script>

<template>
  <ResizablePanelGroup id="resize-panel-group-1" direction="horizontal"
    class="h-full max-h-[calc(100dvh-53px-3rem)] items-stretch">
    <ResizablePanel id="resize-panel-1" :default-size="defaultLayout[0]" :collapsed-size="navCollapsedSize" collapsible
      :min-size="15" :max-size="20" :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
      @expand="onExpand" @collapse="onCollapse">
      <div :class="cn('flex h-[56px] items-center justify-center', isCollapsed ? 'h-[56px]' : 'px-2')">
        <MailAccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
      </div>
      <Separator />
      <MailNav :is-collapsed="isCollapsed" :links="links" />
      <Separator />
      <MailNav :is-collapsed="isCollapsed" :links="links2" />
    </ResizablePanel>
    <ResizableHandle id="resize-handle-1" with-handle />
    <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30" class="flex flex-col h-full">
      <Tabs default-value="操作" class="flex flex-col flex-1  ">
        <div class="flex items-center px-4 py-2">
          <Select v-model="config.source_lang">
            <SelectTrigger style="max-width: 150px;;">
              <SelectValue placeholder="源语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="item in lg_arr">
                <SelectLabel>{{ item.first }}</SelectLabel>
                <SelectItem :value="lg" v-for="lg in item.lgs">
                  {{ lg }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Icon name="lucide:arrow-right-left" class="mr-2 ml-2 size-4 cursor-pointer" @click=changeTaS />
          <Select v-model="config.target_lang">
            <SelectTrigger style="max-width: 150px;;">
              <SelectValue placeholder="目标语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="item in lg_arr">
                <SelectLabel>{{ item.first }}</SelectLabel>
                <SelectItem :value="lg" v-for="lg in item.lgs">
                  {{ lg }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger as-child>
              <Button class="ml-2">批量翻译</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>请选择TXT文件</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Input id="upload-file" type="file" multiple placeholder="选择TXT文件（可多选）" accept=".txt"
                  @change="handleFileUpload" />
              </div>
              <div class="flex items-center " v-if="upload_loading">
                <span class="text-sm text-muted-foreground">进度：</span><Progress v-model="upload_progress"
                  class="flex-1" />
              </div>
              <DialogFooter>
                <Button type="submit" :disabled="upload_loading" @click="submit">
                  <Loader2 v-if="upload_loading" class="w-4 h-4 mr-2 animate-spin" />
                  提交
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <TabsList class="ml-auto">
            <TabsTrigger value="操作" class="text-zinc-600 dark:text-zinc-200">
              操作
            </TabsTrigger>
            <TabsTrigger value="历史" class="text-zinc-600 dark:text-zinc-200">
              历史
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />

        <TabsContent value="操作" class="flex flex-1 overflow-auto m-0">
          <div
            class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea placeholder="请输入您需要翻译的内容。" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">

              1/20000
            </p>
            <Button class="mt-4">开始翻译</Button>
          </div>
          <div
            class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea placeholder="已翻译内容" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">

              1/20000
            </p>
            <Button variant="outline" class="mt-4">复制结果</Button>
          </div>
        </TabsContent>
        <TabsContent value="历史" class="m-0">
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative ">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue" placeholder="Search" class="pl-8" />
              </div>
            </form>
          </div>
          <TranslateList v-model:selected-mail="selectedMail" :items="unreadMailList" class="w-1/3" />
        </TabsContent>
      </Tabs>
    </ResizablePanel>

  </ResizablePanelGroup>
</template>