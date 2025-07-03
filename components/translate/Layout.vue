<script lang="ts" setup>
import type { Mail } from './data/mails'
import type { LinkProp } from '~/components/mail/Nav.vue'
import { useMediaQuery } from '@vueuse/core'
import moment from 'moment'
import { cn } from '~/lib/utils'
import { Loader2, Globe } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { useI18n } from '#imports'
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/translate/multiselect'
import { api } from '@/utils/api'
import { onMounted } from 'vue'
let user_id = ''
onMounted(async () => {
  user_id = localStorage.getItem('user_id') || ''
  console.log(user_id)
  getList()
})

const { toast } = useToast()
const { t, locale, locales } = useI18n()

// 切换界面语言

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
const selectedTask = ref({} as any)
const selectedArt = ref({} as any)
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
    title: t('translate.manual'),
    label: '128',
    icon: 'lucide:inbox',
    variant: 'ghost',
  },
  {
    title: t('translate.txt'),
    label: '128',
    icon: 'lucide:square-equal',
    variant: 'default',
  },
  {
    title: t('translate.html'),
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
  {
    title: t('translate.word'),
    label: '',
    icon: 'lucide:scroll-text',
    variant: 'ghost',
  },
  {
    title: t('translate.pdf'),
    label: '23',
    icon: 'lucide:app-window-mac',
    variant: 'ghost',
  },
  {
    title: t('translate.excel'),
    label: '',
    icon: 'lucide:table-properties',
    variant: 'ghost',
  },
  {
    title: t('translate.classical'),
    label: '',
    icon: 'lucide:inspection-panel',
    variant: 'ghost',
  },
  {
    title: t('translate.mp3'),
    label: '',
    icon: 'lucide:file-audio',
    variant: 'ghost',
  },
  {
    title: t('translate.wav'),
    label: '',
    icon: 'lucide:file-audio-2',
    variant: 'ghost',
  },
  {
    title: t('translate.m4a'),
    label: '',
    icon: 'lucide:file-video',
    variant: 'ghost',
  },
]

const links2: LinkProp[] = [
  {
    title: t('translate.image'),
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
        t('languages.arabic'),
        t('languages.estonian'),
        t('languages.azerbaijani'),
        t('languages.albanian'),
        t('languages.irish'),
        t('languages.amharic'),
        t('languages.assamese'),
        t('languages.oriya'),
        t('languages.algerian_arabic'),
        t('languages.akan'),
        t('languages.aragonese'),
        t('languages.asturian'),
        t('languages.aymara'),
        t('languages.ojibwe'),
        t('languages.occitan'),
        t('languages.oromo'),
        t('languages.ossetic')
      ]
    },
    {
      "first": "B",
      "lgs": [
        t('languages.polish'),
        t('languages.bulgarian'),
        t('languages.persian'),
        t('languages.belarusian'),
        t('languages.bosnian'),
        t('languages.basque'),
        t('languages.icelandic'),
        t('languages.northernSotho'),
        t('languages.bislama'),
        t('languages.bashkir'),
        t('languages.brazilianPortuguese'),
        t('languages.berber'),
        t('languages.pangasinan'),
        t('languages.northernSami'),
        t('languages.bemba'),
        t('languages.blin'),
        t('languages.baluchi'),
        t('languages.bhojpuri'),
        t('languages.breton')
      ]
    },
    {
      "first": "C",
      "lgs": [
        t('languages.tsonga'),
        t('languages.chuvash')
      ]
    },
    {
      "first": "D",
      "lgs": [
        t('languages.german'),
        t('languages.danish'),
        t('languages.dhivehi'),
        t('languages.tetum'),
        t('languages.tatar'),
        t('languages.lowGerman')
      ]
    },
    {
      "first": "E",
      "lgs": [
        t('languages.russian')
      ]
    },
    {
      "first": "F",
      "lgs": [
        t('languages.french'),
        t('languages.finnish'),
        t('languages.filipino'),
        t('languages.fulani'),
        t('languages.faroese'),
        t('languages.sanskrit'),
        t('languages.friulian')
      ]
    },
    {
      "first": "G",
      "lgs": [
        t('languages.khmer'),
        t('languages.georgian'),
        t('languages.gujarati'),
        t('languages.kongo'),
        t('languages.guarani'),
        t('languages.greenlandic'),
        t('languages.gaelic'),
        t('languages.upperSorbian'),
        t('languages.ancientGreek'),
        t('languages.oldEnglish')
      ]
    },
    {
      "first": "H",
      "lgs": [
        t('languages.korean'),
        t('languages.dutch'),
        t('languages.montenegrin'),
        t('languages.hausa'),
        t('languages.haitian'),
        t('languages.hakha'),
        t('languages.hupa')
      ]
    },
    {
      "first": "J",
      "lgs": [
        t('languages.czech'),
        t('languages.catalan'),
        t('languages.galician'),
        t('languages.kyrgyz'),
        t('languages.canadianFrench')
      ]
    },
    {
      "first": "K",
      "lgs": [
        t('languages.croatian'),
        t('languages.kannada'),
        t('languages.xhosa'),
        t('languages.corsican'),
        t('languages.kurdish'),
        t('languages.konkani'),
        t('languages.kashmiri'),
        t('languages.kabyle'),
        t('languages.kanuri'),
        t('languages.kashubian'),
        t('languages.cornish'),
        t('languages.creek'),
        t('languages.crimeanTatar'),
        t('languages.klingon'),
        t('languages.quechua')
      ]
    },
    {
      "first": "L",
      "lgs": [
        t('languages.romanian'),
        t('languages.lao'),
        t('languages.latin'),
        t('languages.lithuanian'),
        t('languages.latvian'),
        t('languages.luxembourgish'),
        t('languages.lingala'),
        t('languages.romansh'),
        t('languages.latgalian'),
        t('languages.limburgish'),
        t('languages.luganda'),
        t('languages.rusyn'),
        t('languages.kinyarwanda'),
        t('languages.romani'),
        t('languages.lojban')
      ]
    },
    {
      "first": "M",
      "lgs": [
        t('languages.burmese'),
        t('languages.malay'),
        t('languages.hmong'),
        t('languages.bengali'),
        t('languages.macedonian'),
        t('languages.marathi'),
        t('languages.malayalam'),
        t('languages.maltese'),
        t('languages.maori'),
        t('languages.malagasy'),
        t('languages.maithili'),
        t('languages.marshallese'),
        t('languages.manx'),
        t('languages.mauritianCreole')
      ]
    },
    {
      "first": "N",
      "lgs": [
        t('languages.norwegian'),
        t('languages.nepali'),
        t('languages.afrikaans'),
        t('languages.southernSotho'),
        t('languages.southernNdebele'),
        t('languages.neapolitan')
      ]
    },
    {
      "first": "P",
      "lgs": [
        t('languages.portuguese'),
        t('languages.pashto'),
        t('languages.punjabi'),
        t('languages.papiamento')
      ]
    },
    {
      "first": "Q",
      "lgs": [
        t('languages.chichewa'),
        t('languages.twi'),
        t('languages.cherokee')
      ]
    },
    {
      "first": "R",
      "lgs": [
        t('languages.japanese'),
        t('languages.swedish')
      ]
    },
    {
      "first": "S",
      "lgs": [
        t('languages.slovenian'),
        t('languages.slovak'),
        t('languages.sinhala') + ' ',
        t('languages.serbianLatin'),
        t('languages.serbianCyrillic'),
        t('languages.swahili'),
        t('languages.somali'),
        t('languages.samoan'),
        t('languages.esperanto'),
        t('languages.scots'),
        t('languages.sardinian'),
        t('languages.serboCroatian'),
        t('languages.shan'),
        t('languages.songhay'),
        t('languages.bokmal'),
        t('languages.cebuano')
      ]
    },
    {
      "first": "T",
      "lgs": [
        t('languages.thai'),
        t('languages.turkish'),
        t('languages.tamil'),
        t('languages.turkmen'),
        t('languages.tajik'),
        t('languages.telugu'),
        t('languages.tagalog'),
        t('languages.tigrinya'),
        t('languages.tunisianArabic')
      ]
    },
    {
      "first": "W",
      "lgs": [
        t('languages.ukrainian'),
        t('languages.urdu'),
        t('languages.welsh'),
        t('languages.wolof'),
        t('languages.venda'),
        t('languages.walloon')
      ]
    },
    {
      "first": "X",
      "lgs": [
        t('languages.spanish'),
        t('languages.hungarian'),
        t('languages.greek'),
        t('languages.hebrew'),
        t('languages.sindhi'),
        t('languages.shona'),
        t('languages.hawaiian'),
        t('languages.syriac'),
        t('languages.sundanese'),
        t('languages.westernSaharaArabic'),
        t('languages.westFrisian'),
        t('languages.silesian'),
        t('languages.hiligaynon'),
        t('languages.lowerSorbian'),
        t('languages.nynorsk')
      ]
    },
    {
      "first": "Y",
      "lgs": [
        t('languages.english'),
        t('languages.vietnamese'),
        t('languages.italian'),
        t('languages.indonesian'),
        t('languages.hindi'),
        t('languages.armenian'),
        t('languages.yoruba'),
        t('languages.igbo'),
        t('languages.yiddish'),
        t('languages.acehnese'),
        t('languages.ido'),
        t('languages.inuktitut'),
        t('languages.interlingua'),
        t('languages.ingush')
      ]
    },
    {
      "first": "Z",
      "lgs": [
        t('languages.chineseSimplified'),
        t('languages.chineseTraditional'),
        t('languages.chineseCantonese'),
        t('languages.chineseClassical'),
        t('languages.zulu'),
        t('languages.javanese'),
        t('languages.zazaki'),
        t('languages.medievalFrench')
      ]
    }
  ]
)
const upload_progress = ref(50)
const showFileUploadDialog = ref(false) // 控制文件上传对话框的显示状态

// 打开文件上传对话框的方法
const openFileUploadDialog = () => {
  showFileUploadDialog.value = true
}

// 关闭文件上传对话框的方法
const closeFileUploadDialog = () => {
  showFileUploadDialog.value = false
}

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files

  if (!files || files.length === 0) {
    console.log(t('fileUpload.noFileSelected'))
    return
  }

  const fileContents: string[] = []
  let filesProcessed = 0

  // 过滤出txt文件
  const txtFiles = Array.from(files).filter(file =>
    file.name.toLowerCase().endsWith('.txt')
  )

  if (txtFiles.length === 0) {
    console.log(t('fileUpload.noTxtFileSelected'))
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
        let results = []
        for (var i = 0; i < fileContents.length; i++) {

          results.push({ content: fileContents[i], title: file.name })
        }
        config.value.contents = results
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
    console.log(t('fileUpload.nonTxtFilesSkipped'),
      nonTxtFiles.map(f => f.name).join(', ')
    )
  }
  closeFileUploadDialog()
}
const config = ref({
  task_type: 'multi_translation',
  source_lang: '',
  target_langs: [] as any,
  contents: [] as any,
  content_count: 0,
})
const upload_loading = ref(false)
const getList = async () => {
  let res = await api.post('/usertask/usertask_list', { user_id, task_type: config.value.task_type, })
  if (res.list) {
    tasklist.value = res.list
    if (!selectedTask.value._id && res.list.length > 0) {
      getArtList(res.list[0])
    }
  }
  console.log(res)
}
const submit = async () => {
  try {
    console.log('提交的配置:', config.value)
    console.log('用户ID:', user_id)

    upload_loading.value = true
    let res = await api.post('/usertask/usertask_upd', { ...config.value, user_id })
    console.log('API响应:', res)

    if (res && res.msg && res.user_id) {
      user_id = res.user_id
      console.log('保存用户ID:', res.user_id)
      localStorage.setItem('user_id', res.user_id)
      config.value.contents = []
      config.value.target_langs = []
      showHistory()
      toast({
        description: res.msg,
      });
    } else {
      console.error('API响应格式不正确:', res)
      toast({
        title: '错误',
        description: '服务器响应格式不正确',
        variant: 'destructive'
      });
    }
  } catch (error) {
    console.error('提交失败:', error)
    toast({
      title: '错误',
      description: error instanceof Error ? error.message : '提交失败',
      variant: 'destructive'
    });
  } finally {
    upload_loading.value = false
    isShowSubmitDialog.value = false
  }
}
const changeTaS = () => {
  // let src = config.value.source_lang
  // config.value.source_lang = config.value.target_lang
  // config.value.target_lang = src
}


// 将 lg_arr 转换为 MultiSelect 组件需要的格式
const languageOptions = computed(() => {
  return lg_arr.value.map(group => ({
    label: group.first,
    items: group.lgs.map(lang => ({
      value: lang,
      label: lang
    }))
  }))
})
const selectedTab = ref('翻译历史')
const isShowSubmitDialog = ref(false)
const showSubmitDialog = () => {
  console.log(config.value)
  config.value.content_count = config.value.contents.length
  config.value.source_lang = config.value.source_lang.trim()
  config.value.target_langs = config.value.target_langs.map((lang: any) => lang.trim())
  if (config.value.target_langs.length == 0) {
    return toast({
      title: t('toast.notice'),
      description: t('toast.selectTargetLang'),
      variant: 'destructive'
    });
  }
  if (config.value.contents.length == 0) {
    return toast({
      title: t('toast.notice'),
      description: '请输入或导入需要翻译的内容',
      variant: 'destructive'

    });
  }
  isShowSubmitDialog.value = true
}
const showHistory = () => {
  selectedTab.value = '翻译历史'
  getList()
}
const getArtList = async (task: any) => {
  selectedTask.value = task
  let res = await api.post('/usertask/usertaskitem_list', { task_id: task._id })
  if (res.list) {
    artlist.value = res.list
    if ((!selectedArt.value._id || selectedArt.value.task_id != task._id) && res.list.length > 0) {
      select_art(res.list[0])
    }

  }
  console.log(res)
}
watch(() => selectedTab.value, (newTab, oldTab) => {
  console.log(`Tab changed from ${oldTab} to ${newTab}`);
  // 在这里执行tab变化时需要的逻辑
  if (newTab === '翻译历史') {
    getList(); // 例如，当切换到历史标签时获取列表数据
  }
});
const tasklist = ref([] as any)
const artlist = ref([] as any)
const htmlContent = ref('')
const htmlContentNew = ref('')
const select_art = async (art: any) => {
  selectedArt.value = art
  let res = await api.post('/usertask/usertaskitem_format', { _id: art._id })
  if (res.format_content) {
    htmlContent.value = res.format_content
    htmlContentNew.value = res.format_content_new
  }
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
      <Tabs v-model="selectedTab" class="flex flex-col flex-1  ">
        <div class="flex items-center px-4 py-2">
          <TabsList class="">
            <TabsTrigger value="单篇翻译" class="text-zinc-600 dark:text-zinc-200">
              单篇翻译
            </TabsTrigger>
            <TabsTrigger value="多篇翻译" class="text-zinc-600 dark:text-zinc-200">
              多篇翻译
            </TabsTrigger>
            <TabsTrigger value="翻译历史" class="text-zinc-600 dark:text-zinc-200">
              翻译历史
            </TabsTrigger>
          </TabsList>

        </div>
        <Separator />
        <div class="flex items-center px-4 py-2 max-w-1/2">
          <Select v-model="config.source_lang">
            <SelectTrigger>
              <SelectValue :placeholder="t('translate.sourceLanguagePlaceholder')" />
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

          <Icon name="lucide:arrow-right" class="mr-2 ml-2 size-4 cursor-pointer" @click=changeTaS />
          <MultiSelect placeholder="请选择目标语言（多选）" v-model="config.target_langs" :options="languageOptions" multiple>
            <MultiSelectTrigger>
              <MultiSelectValue :placeholder="t('translate.targetLanguagePlaceholder')" />
            </MultiSelectTrigger>
          </MultiSelect>
        </div>
        <Separator />

        <TabsContent v-if="selectedTab == '单篇翻译'" value="单篇翻译" class="flex flex-1 overflow-auto m-0 gap-4 p-4 ">
          <div
            class="bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea id="input-text" :placeholder="t('translate.inputPlaceholder')" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">
              0/20000
            </p>
            <Button class="mb-2 mt-2" @click="showSubmitDialog">开始翻译</Button>

          </div>
          <div
            class="bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea disabled :placeholder="t('translate.outputPlaceholder')" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">

              0/20000
            </p>
          </div>
        </TabsContent>
        <TabsContent v-if="selectedTab == '多篇翻译'" value="多篇翻译" class="flex flex-1 overflow-auto m-0 gap-4 p-4 ">
          <div v-if="config.contents.length == 0"
            class="bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <!-- <Textarea :placeholder="t('translate.inputPlaceholder')" class="flex-1" /> -->
            <div class="w-full flex-1 bg-gray/5">
              <div class="w-full h-full text-center line-height-100 border rounded-md color-gray-500 cursor-pointer"
                @click="openFileUploadDialog">
                请点击批量导入TXT
              </div>
            </div>
            <p class="text-sm text-muted-foreground mt-2 text-right">
              请上传需要翻译的TXT文件
            </p>
            <Button class="mb-2 mt-2 " disabled>开始翻译</Button>

          </div>
          <div class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2"
            v-if="config.contents.length > 0">
            <div
              class="flex flex items-start gap-2 rounded-lg   text-left text-sm transition-all w-full justify-between">
              <p class="leading-7 [&:not(:first-child)]:mt-6">
                <span class="font-semibold">已导入TXT：</span>{{ config.contents.length }}
              </p>
              <Button variant="outline" size="sm" @click="openFileUploadDialog">重新导入</Button>
            </div>
            <ScrollArea class="h-[calc(100dvh-72px-56px-10rem-53px)] flex mt-2">
              <div class="flex flex-1 flex-col gap-2  pt-0">
                <TransitionGroup name="list" appear>
                  <button v-for="item, index of config.contents" :key="index"
                    class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                    :title="item.content">
                    <div class="w-full flex flex-col gap-1">
                      <div class="flex items-center">
                        <div class="flex items-center gap-2">
                          <div class="font-semibold">
                            {{ item.title }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="line-clamp-2 text-xs text-muted-foreground">
                      {{ item.content }}
                    </div>
                    <div class="text-xs text-muted-foreground flex justify-between w-full">
                      <div>
                        准备翻译... 字数： {{ item.content.length }}
                      </div>
                    </div>
                  </button>
                </TransitionGroup>
              </div>
            </ScrollArea>

            <Button class="w-full mb-2 mt-2 " @click="showSubmitDialog">开始翻译</Button>
          </div>
          <div
            class="bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea disabled :placeholder="t('translate.outputPlaceholder')" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">

              0/20000
            </p>
          </div>

        </TabsContent>
        <TabsContent v-if="selectedTab == '翻译历史'" value="翻译历史" class="flex flex-1 overflow-auto m-0 gap-4 p-4 ">
          <ScrollArea class="h-[calc(100dvh-72px-56px-6rem-53px)] flex w-1/4">
            <div class="flex flex-1 flex-col gap-2  pt-0">
              <TransitionGroup name="list" appear>
                <button v-for="item of tasklist" :key="item._id" :class="cn(
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-primary/5',
                  selectedTask._id === item._id && 'bg-primary/5',
                )" @click="getArtList(item)">

                  <div class="w-full flex flex-col gap-1">
                    <div class="flex items-center">
                      <div class="flex items-center gap-2">
                        <div class="font-semibold">
                          {{ moment(item.created).format('YYYY-MM-DD HH:mm:ss') }}
                        </div>
                      </div>
                      <div :class="cn(
                        'ml-auto text-xs whitespace-nowrap flex-shrink-0 w-[60px] text-right',
                        selectedTask._id === item._id
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )">
                        {{ item.status }}
                      </div>
                    </div>
                  </div>
                  <div class="line-clamp-2 text-xs text-muted-foreground">
                    语言：{{ item.target_lang_count }}
                    导入：{{ item.content_count }}
                    总计：{{ item.content_count * item.target_lang_count }}

                  </div>
                  <Separator />

                  <div class="flex flex-wrap gap-2">
                    <Badge v-for="lg in item.target_langs" :key="lg" variant="secondary">
                      {{ lg }}
                    </Badge>
                  </div>
                </button>
              </TransitionGroup>
            </div>
          </ScrollArea>

          <ScrollArea class="h-[calc(100dvh-72px-56px-6rem-53px)] flex w-1/4">
            <div class="flex flex-1 flex-col gap-2  pt-0">
              <TransitionGroup name="list" appear>
                <button v-for="item of artlist" :key="item._id" :class="cn(
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                  selectedArt._id === item._id && 'bg-muted',
                )" @click="select_art(item)">
                  <div class="w-full flex flex-col gap-1">
                    <div class="flex ">
                      <div class="flex items-center gap-2">
                        <div class="font-semibold line-clamp-2 ">
                          {{ item.title }}
                        </div>
                      </div>
                      <div :class="cn(
                        'ml-auto text-xs flex-shrink-0 w-[60px] text-right',
                        selectedTask._id === item._id
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )">
                        {{ item.status }}
                      </div>
                    </div>
                  </div>
                  <div class="line-clamp-2 text-xs text-muted-foreground">
                    源文：{{ item.content_short }}
                  </div>
                  <div class="line-clamp-2 text-xs text-muted-foreground">
                    译文：{{ item.content_new_short || item.status }}
                  </div>
                  <Separator />
                  <div class="line-clamp-2 text-xs text-muted-foreground item-center flex">
                    {{ item.source_lang }}
                    <Icon name="lucide:arrow-right" class="mr-2 ml-2 size-4 cursor-pointer" />
                    {{ item.target_lang }}
                  </div>
                </button>
              </TransitionGroup>
            </div>
          </ScrollArea>
          <ScrollArea class="h-[calc(100dvh-72px-56px-6rem-53px)] flex w-1/4 border rounded-md">
            <div class=" bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
              <div editable="true" v-html="htmlContent" class="flex-1 "></div>
            </div>
          </ScrollArea>

          <ScrollArea class="h-[calc(100dvh-72px-56px-6rem-53px)] flex w-1/4 border rounded-md">
            <div class=" bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2">
              <div editable="true" v-html="htmlContentNew" class="flex-1 "></div>
            </div>
          </ScrollArea>


        </TabsContent>
      </Tabs>
    </ResizablePanel>
    <Dialog :open="isShowSubmitDialog" @update:open="isShowSubmitDialog = false">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>提醒</DialogTitle>
        </DialogHeader>
        <p class="color-gray text-sm">
          你已导入 {{ config.contents.length }} 篇文章，并且选择了 {{ config.target_langs.length }} 个目标语言，总计会生成 {{
            config.target_langs.length * config.contents.length }} 篇翻译结果，是否确认开始翻译？
        </p>
        <div class="flex items-center ">
          <span class="text-sm text-muted-foreground">{{ t('fileUpload.progress') }}</span><Progress
            v-model="upload_progress" class="flex-1" />
        </div>
        <DialogFooter>
          <Button type="submit" @click="submit" :disabled="upload_loading">
            确定提交
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog :open="showFileUploadDialog" @update:open="closeFileUploadDialog">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ t('translate.selectTxtFiles') }}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <Input id="upload-file" type="file" multiple :placeholder="t('fileUpload.selectTxtFiles')" accept=".txt"
            @change="handleFileUpload" />
        </div>

        <DialogFooter>
          <Button variant="outline" @click="closeFileUploadDialog">
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </ResizablePanelGroup>
</template>