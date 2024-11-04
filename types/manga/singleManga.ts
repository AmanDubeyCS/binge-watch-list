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
      nu: string
      amz: string
      ap: string
      bw: string
      cdj: string
      ebj: string
      engtl: string
      kt: string
      mal: string
      mu: string
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

interface Chapter {
  chapter: string
  id: string
  others: string[]
  count: number
}

export interface Volume {
  volume: string
  count: number
  chapters: Record<string, Chapter>
}

export interface VolumesData {
  result: string
  volumes: Record<string, Volume>
}

export interface Comments {
  threadId: number
  repliesCount: number
}

interface RatingDistribution {
  [key: string]: number // Keys are "1" through "10", each representing a rating count
}

interface Rating {
  average: number
  bayesian: number
  distribution: RatingDistribution
}

export interface MangaStatistics {
  comments: Comments
  rating: Rating
  follows: number
}

export interface StatisticsData {
  result: string
  statistics: Record<string, MangaStatistics> // Key is a unique manga ID
}
