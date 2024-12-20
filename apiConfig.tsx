const isProd = true
const tvdb = ""
export const BASE_URL_MANGADEX = isProd
  ? "https://api.mangadex.org"
  : "https://api.mangadex.dev"

export const BASE_URL_ANIME = "https://api.jikan.moe/v4"

const BASE_URL_TMDB = "https://api.themoviedb.org/3"

const BASE_RAWG_URL = "https://api.rawg.io/api"

const OMBD_BASE_URL = "https://www.omdbapi.com/"

export const config = {
  getMangaList: ({ limit, offset, title }: any) =>
    `${BASE_URL_MANGADEX}/manga?title=${title}&limit=${limit}&offset=${offset}&includes%5B%5D=cover_art`,
  getTopManhwa: ({ limit, offset }: any) =>
    `${BASE_URL_MANGADEX}/manga?limit=${limit}&offset=${offset}&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&originalLanguage[]=ko&order[rating]=desc&includedTagsMode=AND&excludedTagsMode=OR`,

  getTopManhua: `${BASE_URL_MANGADEX}/manga?limit=16&offset=0&includes[]=cover_art&contentRating[]=suggestive&contentRating[]=safe&originalLanguage[]=zh&order[rating]=desc&includedTags[]=799c202e-7daa-44eb-9cf7-8a3c0441531e&includedTagsMode=AND&excludedTagsMode=OR`,

  getPopularManga: `${BASE_URL_MANGADEX}/manga?limit=16&offset=0&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&originalLanguage[]=ja&order[followedCount]=desc&includedTagsMode=AND&excludedTagsMode=OR`,
  getSingleManga: ({ mangaID }: any) =>
    `${BASE_URL_MANGADEX}/manga/${mangaID}?includes%5B%5D=cover_art&includes%5B%5D=artist&&includes%5B%5D=author&includes%5B%5D=creator`,
  getMangaChapters: ({ mangaID }: any) =>
    `${BASE_URL_MANGADEX}/manga/${mangaID}/aggregate`,
  getMangaStatistics: ({ mangaID }: any) =>
    `${BASE_URL_MANGADEX}/statistics/manga/${mangaID}`,
  getChapterData: (chapterID: any) =>
    `${BASE_URL_MANGADEX}/at-home/server/${chapterID}`,
  getMangaArt: (mangaId: string) =>
    `${BASE_URL_MANGADEX}/cover?order[volume]=asc&manga[]=${mangaId}&limit=15&offset=0`,

  getBannerAnime: `${BASE_URL_ANIME}/anime?status=airing&order_by=score&sort=desc&start_date=2024-01-01&limit=6`,
  getAnimeList: `${BASE_URL_ANIME}/top/anime?type=tv&filter=airing&limit=15`,
  getLatestpromos: `${BASE_URL_ANIME}/watch/promos`,
  getUpcomongAnimes: `${BASE_URL_ANIME}/seasons/upcoming?limit=15`,
  getPopularStudios: `${BASE_URL_ANIME}/producers?order_by=favorites&sort=desc&limit=15`,
  getAnimeGenres: `${BASE_URL_ANIME}/genres/anime`,

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
  getMovieProviders: `${BASE_URL_TMDB}/watch/providers/movie?language=en-US&watch_region=IN`,
  getMovieGenres: `${BASE_URL_TMDB}/genre/movie/list`,
  getMovieLanguagesList: `${BASE_URL_TMDB}/configuration/languages`,
  getMoviecertificationsList: `${BASE_URL_TMDB}/certification/movie/list`,

  getMovieVideos: (movieId: number) =>
    `${BASE_URL_TMDB}/movie/${movieId}/videos`,
  getMovieByGenres: (genresID: number) =>
    `${BASE_URL_TMDB}/discover/movie?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_genres=${genresID}&without_keywords=210024`,
  getMovieByProvider: (tvProviderId: number) =>
    `${BASE_URL_TMDB}/discover/movie?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_watch_providers=${tvProviderId}&without_keywords=210024`,
  getSingleMovie: ({ movieID }: any) =>
    `${BASE_URL_TMDB}/movie/${movieID}?append_to_response=external_ids%2Cvideos%2Cwatch%2Fproviders&language=en-US`,
  getSingleMovieCast: (movieId: number) =>
    `${BASE_URL_TMDB}/movie/${movieId}/credits?language=en-US`,
  getSingleMovieCollection: (movieId: number) =>
    `https://api.themoviedb.org/3/collection/${movieId}?language=en-US`,
  getMovieReviews: (movieId: number) =>
    `${BASE_URL_TMDB}/movie/${movieId}/reviews?language=en-US&page=1`,
  getMovieRecommendations: (movieId: number) =>
    `${BASE_URL_TMDB}/movie/${movieId}/recommendations?language=en-US&page=1`,
  getMovieImages: (movieId: number) =>
    `${BASE_URL_TMDB}/movie/${movieId}/images`,

  getTvList: `${BASE_URL_TMDB}/trending/tv/day?language=en-US`,
  getTvPopular: `${BASE_URL_TMDB}/discover/tv?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&without_keywords=210024`,
  getTvProviders: `${BASE_URL_TMDB}/watch/providers/tv?language=en-US&watch_region=IN`,
  getTvGenres: `${BASE_URL_TMDB}/genre/tv/list`,
  getTvcertificationsList: `${BASE_URL_TMDB}/certification/tv/list`,

  getTvVideos: (tvId: number) => `${BASE_URL_TMDB}/tv/${tvId}/videos`,
  getTvByProvider: (tvProviderId: number) =>
    `${BASE_URL_TMDB}/discover/tv?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_watch_providers=${tvProviderId}&without_keywords=210024`,
  getTvByGenres: (genresID: number) =>
    `${BASE_URL_TMDB}/discover/tv?air_date.lte=2025-04-07&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&watch_region=IN&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate%7Cfree%7Cads%7Crent%7Cbuy&with_genres=${genresID}&without_keywords=210024`,
  getSingleTv: ({ tvID }: any) =>
    `${BASE_URL_TMDB}/tv/${tvID}?append_to_response=external_ids%2Cvideos%2Cwatch%2Fproviders&language=en-US`,
  getSingleTvProfile: (tvID: number) =>
    `${BASE_URL_TMDB}/tv/${tvID}?append_to_response=videos&language=en-US`,
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
    `${BASE_URL_TMDB}/person/${personID}?append_to_response=combined_credits,external_ids&language=en-US`,
  getPopularPersons: `${BASE_URL_TMDB}/person/popular`,

  searchMovie: (query: string) =>
    `${BASE_URL_TMDB}/search/movie?query=${query}&include_adult=true&language=en-US&page=1`,
  searchTvShow: (query: string) =>
    `${BASE_URL_TMDB}/search/tv?query=${query}&include_adult=true&language=en-US&page=1`,
}

export const configRAWG = {
  getGamesList: `${BASE_RAWG_URL}/games?key=${process.env.RAWG_API_KEY}`,
  getSingleGame: (gameId: number) =>
    `${BASE_RAWG_URL}/games/${gameId}?key=${process.env.RAWG_API_KEY}`,
  getAdditions: (gameId: number) =>
    `${BASE_RAWG_URL}/games/${gameId}/additions`,
  getGameAchivements: (gameId: number) =>
    `${BASE_RAWG_URL}/games/${gameId}/achievements`,
  getWhereToBuy: (gameId: number) => `${BASE_RAWG_URL}/games/${gameId}/stores`,
}

export const configOMDB = {
  getOmdbData: (contentId: string) =>
    `${OMBD_BASE_URL}/?i=${contentId}&plot=full&apikey=${process.env.OMDB_API_KEY}`,
  getOmdbSearchData: (contentId: string) =>
    `${OMBD_BASE_URL}/?t=${contentId}&plot=full&apikey=${process.env.OMDB_API_KEY}`,
}
