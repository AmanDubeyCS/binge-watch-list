export interface MangaTag {
  id: string
  type: string
  attributes: {
    name: {
      en: string
    }
    description: Record<string, unknown>
    group: string
    version: number
  }
  relationships: any[]
}

interface MangaLinks {
  al?: string
  ap?: string
  bw?: string
  kt?: string
  mu?: string
  amz?: string
  cdj?: string
  ebj?: string
  mal?: string
  raw?: string
}

interface Manga {
  title: {
    en: string
    ja: string
    "ja-ro": string
  }
  altTitles: Array<{
    [key: string]: string
  }>
  description: {
    en: string
  }
  isLocked: boolean
  links: MangaLinks
  originalLanguage: string
  lastVolume: string
  lastChapter: string
  publicationDemographic: string
  status: string
  year: number
  contentRating: string
  tags: MangaTag[]
  state: string
  chapterNumbersResetOnNewVolume: boolean
  createdAt: string // or Date
  updatedAt: string // or Date
  version: number
  availableTranslatedLanguages: string[]
  latestUploadedChapter: string
}

export interface MangaItem {
  id: string
  type: string
  attributes: Manga
  relationships: Array<{
    id: string
    type: string
    related: string
    attributes: Record<string, unknown>
  }>
  rating: MangaStatistics
}

interface MangaStatistics {
  comments: {
    threadId: number
    repliesCount: number
  }
  follows: number
  rating: {
    average: number
    bayesian: number
  }
}

export interface MangaResponse {
  result: string
  response: string
  data: MangaItem[]
  limit: number
  offset: number
  total: number
}
