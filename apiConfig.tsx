const isProd = true
const tvdb = "14923218-bcc2-4cdb-ab1a-1983494b21ed"
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

  getBannerAnime: `https://api.jikan.moe/v4/anime?status=airing&order_by=score&sort=desc&start_date=2024-01-01&limit=6`,
  getAnimeList: `${BASE_URL_ANIME}/top/anime?type=tv&filter=airing&limit=15`,
  getLatestpromos: `${BASE_URL_ANIME}/watch/promos`,
  getUpcomongAnimes: `${BASE_URL_ANIME}/seasons/upcoming?limit=15`,
  getPopularStudios: `${BASE_URL_ANIME}/producers?order_by=favorites&sort=desc&limit=15`,
  getSingleAnime: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/full`,
  getSearchedAnime: (title: string) =>
    `${BASE_URL_ANIME}/anime?q=${title}&limit=7&type=tv`,
  getAnimeEpisodes: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/episodes`,
  getAnimeEpisodeVideo: (animeID: number) =>
    `https://api.jikan.moe/v4/anime/${animeID}/videos/episodes`,
  getCharactersDetail: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/characters`,
  getAnimeStatistics: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/statistics`,
  getAnimeReviews: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/reviews`,
  getAnimePictures: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/pictures`,
  getAnimerecommendations: (animeID: number) =>
    `${BASE_URL_ANIME}/anime/${animeID}/recommendations`,
}

export const configTMDB = {
  getMoviesList: `${BASE_URL_TMDB}/trending/movie/week?language=en-US`,
  getPopularMovie: `${BASE_URL_TMDB}/discover/movie?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&without_keywords=210024`,
  getSingleMovie: ({ movieID }: any) =>
    `${BASE_URL_TMDB}/movie/${movieID}?language=en-US`,

  getTvList: `${BASE_URL_TMDB}/trending/tv/day?language=en-US`,
  getTvPopular: `${BASE_URL_TMDB}/discover/tv?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&without_keywords=210024`,
  getTvProviders: `${BASE_URL_TMDB}/watch/providers/tv?language=en-US&watch_region=IN`,
  getTvGenres: `${BASE_URL_TMDB}/genre/tv/list`,
  getTvByProvider: (tvProviderId: number) =>
    `${BASE_URL_TMDB}/discover/tv?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_watch_providers=${tvProviderId}`,
  getTvByGenres: (genresID: number) =>
    `${BASE_URL_TMDB}/discover/tv?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_genres=${genresID}&without_keywords=210024`,
  getSingleTv: ({ tvID }: any) =>
    `${BASE_URL_TMDB}/tv/${tvID}?append_to_response=external_ids%2Cvideos%2Cwatch%2Fproviders&language=en-US`,
  getSingleTvCast: (seriesId: number) =>
    `${BASE_URL_TMDB}/tv/${seriesId}/aggregate_credits?language=en-US`,
  getTvRecommendations: (seriesId: number) =>
    `${BASE_URL_TMDB}/tv/${seriesId}/recommendations?language=en-US&page=1`,
  getTvReviews: (seriesId: number) =>
    `${BASE_URL_TMDB}/tv/${seriesId}/reviews?language=en-US&page=1`,
  getTvImages: (seriesId: number) => `${BASE_URL_TMDB}/tv/${seriesId}/images`,
  getSeasonEpisodes: (seriesId: number, seasonId: number) =>
    `${BASE_URL_TMDB}/tv/${seriesId}/season/${seasonId}?language=en-US`,

  getPersonDetails: (personID: number) =>
    `${BASE_URL_TMDB}/person/${personID}?append_to_response=combined_credits&language=en-US`,
  getPopularPersons: `${BASE_URL_TMDB}/person/popular`,
}
