const isProd = true;

export const BASE_URL = isProd
  ? "https://api.mangadex.org"
  : "https://api.mangadex.dev";

export const BASE_URL_ANIME = "https://api.jikan.moe/v4"
export const config = {
  getMangaList: ({ limit, offset, title }: any) =>
    `${BASE_URL}/manga?title=${title}&limit=${limit}&offset=${offset}&includes%5B%5D=cover_art`,

  // getCovers: ({mangaIDs}: any) => `${BASE_URL}/cover?limit=100&${mangaIDs}`,
  getSingleManga: ({mangaID}: any) => `${BASE_URL}/manga/${mangaID}?includes%5B%5D=cover_art`,
  getMangaChapters: ({mangaID}: any) => `${BASE_URL}/manga/${mangaID}/aggregate`,
  getMangaStatistics: ({mangaID}: any) => `${BASE_URL}/statistics/manga/${mangaID}`,

  getAnimeList: ({limit, offset, title}: any) => `${BASE_URL_ANIME}/anime?order_by=popularity`,
  getSingleAnime: ({animeID}: any) => `${BASE_URL_ANIME}/anime/${animeID}`
};
