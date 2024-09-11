const isProd = true

export const BASE_URL = isProd
  ? "https://api.mangadex.org"
  : "https://api.mangadex.dev"

export const BASE_URL_ANIME = "https://api.jikan.moe/v4"

const BASE_URL_TMDB = "https://api.themoviedb.org/3"

export const config = {
  getMangaList: ({ limit, offset, title }: any) =>
    `${BASE_URL}/manga?title=${title}&limit=${limit}&offset=${offset}&includes%5B%5D=cover_art`,

  getSingleManga: ({ mangaID }: any) =>
    `${BASE_URL}/manga/${mangaID}?includes%5B%5D=cover_art&includes%5B%5D=artist&&includes%5B%5D=author&includes%5B%5D=creator`,
  getMangaChapters: ({ mangaID }: any) =>
    `${BASE_URL}/manga/${mangaID}/aggregate`,
  getMangaStatistics: ({ mangaID }: any) =>
    `${BASE_URL}/statistics/manga/${mangaID}`,
  getChapterData: (chapterID: any) => `${BASE_URL}/at-home/server/${chapterID}`,

  getAnimeList: () => `${BASE_URL_ANIME}/top/anime?type=tv&filter=airing`,
  getSingleAnime: (animeID: number) => `${BASE_URL_ANIME}/anime/${animeID}`,
  getSearchedAnime: (title: string) =>
    `${BASE_URL_ANIME}/anime?q=${title}&limit=7&type=tv`,
  getAnimeEpisodes: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/episodes`,
  getCharactersDetail: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/characters`,
}

export const configTMDB = {
  getMoviesList: () => `${BASE_URL_TMDB}/trending/movie/week?language=en-US`,
  getSingleMovie: ({ movieID }: any) =>
    `${BASE_URL_TMDB}/movie/${movieID}?language=en-US`,

  getTvList: () => `${BASE_URL_TMDB}/trending/tv/week?language=en-US`,
  getSingleTv: ({ tvID }: any) =>
    `${BASE_URL_TMDB}/tv/${tvID}?append_to_response=credits%2Cseasons&language=en-US`,

  getPersonDetails: (personID: number) =>
    `${BASE_URL_TMDB}/person/${personID}?append_to_response=combined_credits&language=en-US`,
  getPopularPersons: () => `${BASE_URL_TMDB}/person/popular`,
}
