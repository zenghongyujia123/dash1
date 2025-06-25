<script lang="ts" setup>
import type { Mail } from './data/mails'
import type { LinkProp } from '~/components/mail/Nav.vue'
import { useMediaQuery } from '@vueuse/core'
import { Search } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { Loader2, Globe } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { useI18n } from '#imports'
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/translate/multiselect'


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
    console.log(t('fileUpload.nonTxtFilesSkipped'),
      nonTxtFiles.map(f => f.name).join(', ')
    )
  }
}
const config = ref({
  task: t('config.task'),
  source_lang: '',
  target_lang: '',
  contents: [] as any
})
const upload_loading = ref(false)
const submit = () => {
  console.log(config.value)
  let count = config.value.contents.length
  if (count == 0) {
    return toast({
      title: t('toast.notice'),
      description: t('toast.selectTxtFile'),
      variant: 'destructive'
    });
  }

}
const changeTaS = () => {
  let src = config.value.source_lang
  config.value.source_lang = config.value.target_lang
  config.value.target_lang = src
}
const selectedValues = ref([] as any)

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

          <Icon name="lucide:arrow-right-left" class="mr-2 ml-2 size-4 cursor-pointer" @click=changeTaS />
          <MultiSelect 
            :placeholder="t('translate.targetLanguagePlaceholder')"
            v-model="selectedValues" 
            :options="languageOptions"
            multiple
          >
            <MultiSelectTrigger>
              <MultiSelectValue :placeholder="t('translate.targetLanguagePlaceholder')" />
            </MultiSelectTrigger>
          </MultiSelect>
          <Dialog>
            <DialogTrigger as-child>
              <Button class="ml-2">{{ t('translate.batchTranslate') }}</Button>
            </DialogTrigger>
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
              <div class="flex items-center " v-if="upload_loading">
                <span class="text-sm text-muted-foreground">{{ t('fileUpload.progress') }}</span><Progress
                  v-model="upload_progress" class="flex-1" />
              </div>
              <DialogFooter>
                <Button type="submit" :disabled="upload_loading" @click="submit">
                  <Loader2 v-if="upload_loading" class="w-4 h-4 mr-2 animate-spin" />
                  {{ t('translate.submit') }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <TabsList class="ml-auto">
            <TabsTrigger value="操作" class="text-zinc-600 dark:text-zinc-200">
              {{ t('translate.operation') }}
            </TabsTrigger>
            <TabsTrigger value="历史" class="text-zinc-600 dark:text-zinc-200">
              {{ t('translate.history') }}
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />

        <TabsContent value="操作" class="flex flex-1 overflow-auto m-0">
          <div
            class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea :placeholder="t('translate.inputPlaceholder')" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">

              1/20000
            </p>
            <Button class="mt-4">{{ t('translate.startTranslate') }}</Button>
          </div>
          <div
            class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-1/2 flex-1 flex flex-col">
            <Textarea :placeholder="t('translate.outputPlaceholder')" class="flex-1" />
            <p class="text-sm text-muted-foreground mt-2 text-right">

              1/20000
            </p>
            <Button variant="outline" class="mt-4">{{ t('translate.copyResult') }}</Button>
          </div>
        </TabsContent>
        <TabsContent value="历史" class="m-0">
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative ">
                <Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input v-model="searchValue" :placeholder="t('common.search')" class="pl-8" />
              </div>
            </form>
          </div>
          <TranslateList v-model:selected-mail="selectedMail" :items="unreadMailList" class="w-1/3" />
        </TabsContent>
      </Tabs>
    </ResizablePanel>

  </ResizablePanelGroup>
</template>