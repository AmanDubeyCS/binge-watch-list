export interface Manga {
  id: string
  type: "manga"
  attributes: {
    title: {
      en: string
    }
    altTitles: {
      [key: string]: string
    }[]
    description: {
      [key: string]: string
    }
    isLocked: boolean
    links: {
      al: string
      ap: string
      mu: string
      nu: string
      raw: string
    }
    originalLanguage: string
    lastVolume: string
    lastChapter: string
    publicationDemographic: string | null
    status: string
    year: number
    contentRating: string
    tags: Tag[]
    state: string
    chapterNumbersResetOnNewVolume: boolean
    createdAt: string
    updatedAt: string
    version: number
    availableTranslatedLanguages: string[]
    latestUploadedChapter: string
  }
  relationships: Relationship[]
}

interface Tag {
  id: string
  type: "tag"
  attributes: {
    name: {
      en: string
    }
    description: object
    group: string
    version: number
  }
  relationships: any[]
}

interface Relationship {
  id: string
  type: "author" | "artist" | "cover_art" | "creator"
  attributes?: {
    name?: string
    imageUrl?: string | null
    fileName: string | null
    biography?: object
    twitter?: string | null
    pixiv?: string | null
    melonBook?: string | null
    fanBox?: string | null
    booth?: string | null
    namicomi?: string | null
    nicoVideo?: string | null
    skeb?: string | null
    fantia?: string | null
    tumblr?: string | null
    youtube?: string | null
    weibo?: string | null
    naver?: string | null
    website?: string | null
    createdAt: string
    updatedAt: string
    version: number
    username?: string
    roles?: string[]
  }
}
