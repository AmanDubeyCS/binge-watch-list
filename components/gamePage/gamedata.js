export const orderOptions = [
  { slug: "relevance", name: "Relevance" },
  { slug: "-rating", name: "Rating" },
  { slug: "name", name: "Name" },
  { slug: "release-date", name: "Release date" },
  { slug: "-added", name: "Popularity" },
]

export const genreOptions = [
  {
    id: 4,
    name: "Action",
    slug: "action",
    games_count: 183493,
  },
  {
    id: 51,
    name: "Indie",
    slug: "indie",
    games_count: 71440,
  },
  {
    id: 3,
    name: "Adventure",
    slug: "adventure",
    games_count: 143292,
  },
  {
    id: 5,
    name: "RPG",
    slug: "role-playing-games-rpg",
    games_count: 57774,
  },
  {
    id: 10,
    name: "Strategy",
    slug: "strategy",
    games_count: 58026,
  },
  {
    id: 2,
    name: "Shooter",
    slug: "shooter",
    games_count: 59528,
  },
  {
    id: 40,
    name: "Casual",
    slug: "casual",
    games_count: 57478,
  },
  {
    id: 14,
    name: "Simulation",
    slug: "simulation",
    games_count: 71632,
  },
  {
    id: 7,
    name: "Puzzle",
    slug: "puzzle",
    games_count: 97320,
  },
  {
    id: 11,
    name: "Arcade",
    slug: "arcade",
    games_count: 22651,
  },
  {
    id: 83,
    name: "Platformer",
    slug: "platformer",
    games_count: 100826,
  },
  {
    id: 1,
    name: "Racing",
    slug: "racing",
    games_count: 25063,
  },
  {
    id: 59,
    name: "Massively Multiplayer",
    slug: "massively-multiplayer",
    games_count: 3850,
  },
  {
    id: 15,
    name: "Sports",
    slug: "sports",
    games_count: 21821,
  },
  {
    id: 6,
    name: "Fighting",
    slug: "fighting",
    games_count: 11760,
  },
  {
    id: 19,
    name: "Family",
    slug: "family",
    games_count: 5404,
  },
  {
    id: 28,
    name: "Board Games",
    slug: "board-games",
    games_count: 8382,
  },
  {
    id: 34,
    name: "Educational",
    slug: "educational",
    games_count: 15684,
  },
  {
    id: 17,
    name: "Card",
    slug: "card",
    games_count: 4533,
  },
]

export const platformOptions = [
  {
    id: 1,
    name: "PC",
    slug: "pc",
    platforms: [
      {
        id: 4,
        name: "PC",
        slug: "pc",
        games_count: 539197,
      },
    ],
  },
  {
    id: 2,
    name: "PlayStation",
    slug: "playstation",
    platforms: [
      {
        id: 187,
        name: "PlayStation 5",
        slug: "playstation5",
        games_count: 1147,
      },
      {
        id: 18,
        name: "PlayStation 4",
        slug: "playstation4",
        games_count: 6853,
      },
      {
        id: 16,
        name: "PlayStation 3",
        slug: "playstation3",
        games_count: 3167,
      },
      {
        id: 15,
        name: "PlayStation 2",
        slug: "playstation2",
        games_count: 2051,
      },
      {
        id: 27,
        name: "PlayStation",
        slug: "playstation1",
        games_count: 1675,
      },
      {
        id: 19,
        name: "PS Vita",
        slug: "ps-vita",
        games_count: 1448,
      },
      {
        id: 17,
        name: "PSP",
        slug: "psp",
        games_count: 1372,
      },
    ],
  },
  {
    id: 3,
    name: "Xbox",
    slug: "xbox",
    platforms: [
      {
        id: 1,
        name: "Xbox One",
        slug: "xbox-one",
        games_count: 5660,
      },
      {
        id: 186,
        name: "Xbox Series S/X",
        slug: "xbox-series-x",
        games_count: 1004,
      },
      {
        id: 14,
        name: "Xbox 360",
        slug: "xbox360",
        games_count: 2806,
      },
      {
        id: 80,
        name: "Xbox",
        slug: "xbox-old",
        games_count: 739,
      },
    ],
  },
  {
    id: 4,
    name: "iOS",
    slug: "ios",
    platforms: [
      {
        id: 3,
        name: "iOS",
        slug: "ios",
        games_count: 77373,
      },
    ],
  },
  {
    id: 8,
    name: "Android",
    slug: "android",
    platforms: [
      {
        id: 21,
        name: "Android",
        slug: "android",
        games_count: 52400,
      },
    ],
  },
  {
    id: 5,
    name: "Apple Macintosh",
    slug: "mac",
    platforms: [
      {
        id: 5,
        name: "macOS",
        slug: "macos",
        games_count: 105140,
      },
      {
        id: 55,
        name: "Classic Macintosh",
        slug: "macintosh",
        games_count: 675,
      },
      {
        id: 41,
        name: "Apple II",
        slug: "apple-ii",
        games_count: 424,
      },
    ],
  },
  {
    id: 6,
    name: "Linux",
    slug: "linux",
    platforms: [
      {
        id: 6,
        name: "Linux",
        slug: "linux",
        games_count: 77924,
      },
    ],
  },
  {
    id: 7,
    name: "Nintendo",
    slug: "nintendo",
    platforms: [
      {
        id: 7,
        name: "Nintendo Switch",
        slug: "nintendo-switch",
        games_count: 5537,
      },
      {
        id: 8,
        name: "Nintendo 3DS",
        slug: "nintendo-3ds",
        games_count: 1693,
      },
      {
        id: 9,
        name: "Nintendo DS",
        slug: "nintendo-ds",
        games_count: 2483,
      },
      {
        id: 13,
        name: "Nintendo DSi",
        slug: "nintendo-dsi",
        games_count: 37,
      },
      {
        id: 10,
        name: "Wii U",
        slug: "wii-u",
        games_count: 1124,
      },
      {
        id: 11,
        name: "Wii",
        slug: "wii",
        games_count: 2226,
      },
      {
        id: 105,
        name: "GameCube",
        slug: "gamecube",
        games_count: 634,
      },
      {
        id: 83,
        name: "Nintendo 64",
        slug: "nintendo-64",
        games_count: 363,
      },
      {
        id: 24,
        name: "Game Boy Advance",
        slug: "game-boy-advance",
        games_count: 954,
      },
      {
        id: 43,
        name: "Game Boy Color",
        slug: "game-boy-color",
        games_count: 419,
      },
      {
        id: 26,
        name: "Game Boy",
        slug: "game-boy",
        games_count: 612,
      },
      {
        id: 79,
        name: "SNES",
        slug: "snes",
        games_count: 972,
      },
      {
        id: 49,
        name: "NES",
        slug: "nes",
        games_count: 1000,
      },
    ],
  },
  {
    id: 9,
    name: "Atari",
    slug: "atari",
    platforms: [
      {
        id: 28,
        name: "Atari 7800",
        slug: "atari-7800",
        games_count: 64,
      },
      {
        id: 31,
        name: "Atari 5200",
        slug: "atari-5200",
        games_count: 64,
      },
      {
        id: 23,
        name: "Atari 2600",
        slug: "atari-2600",
        games_count: 294,
      },
      {
        id: 22,
        name: "Atari Flashback",
        slug: "atari-flashback",
        games_count: 30,
      },
      {
        id: 25,
        name: "Atari 8-bit",
        slug: "atari-8-bit",
        games_count: 308,
      },
      {
        id: 34,
        name: "Atari ST",
        slug: "atari-st",
        games_count: 836,
      },
      {
        id: 46,
        name: "Atari Lynx",
        slug: "atari-lynx",
        games_count: 57,
      },
      {
        id: 50,
        name: "Atari XEGS",
        slug: "atari-xegs",
        games_count: 22,
      },
      {
        id: 112,
        name: "Jaguar",
        slug: "jaguar",
        games_count: 39,
      },
    ],
  },
  {
    id: 10,
    name: "Commodore / Amiga",
    slug: "commodore-amiga",
    platforms: [
      {
        id: 166,
        name: "Commodore / Amiga",
        slug: "commodore-amiga",
        games_count: 2082,
      },
    ],
  },
  {
    id: 11,
    name: "SEGA",
    slug: "sega",
    platforms: [
      {
        id: 167,
        name: "Genesis",
        slug: "genesis",
        games_count: 840,
      },
      {
        id: 107,
        name: "SEGA Saturn",
        slug: "sega-saturn",
        games_count: 371,
      },
      {
        id: 119,
        name: "SEGA CD",
        slug: "sega-cd",
        games_count: 163,
      },
      {
        id: 117,
        name: "SEGA 32X",
        slug: "sega-32x",
        games_count: 46,
      },
      {
        id: 74,
        name: "SEGA Master System",
        slug: "sega-master-system",
        games_count: 231,
      },
      {
        id: 106,
        name: "Dreamcast",
        slug: "dreamcast",
        games_count: 364,
      },
      {
        id: 77,
        name: "Game Gear",
        slug: "game-gear",
        games_count: 224,
      },
    ],
  },
  {
    id: 12,
    name: "3DO",
    slug: "3do",
    platforms: [
      {
        id: 111,
        name: "3DO",
        slug: "3do",
        games_count: 99,
      },
    ],
  },
  {
    id: 13,
    name: "Neo Geo",
    slug: "neo-geo",
    platforms: [
      {
        id: 12,
        name: "Neo Geo",
        slug: "neogeo",
        games_count: 123,
      },
    ],
  },
  {
    id: 14,
    name: "Web",
    slug: "web",
    platforms: [
      {
        id: 171,
        name: "Web",
        slug: "web",
        games_count: 260083,
      },
    ],
  },
]

export const years = [
  { slug: "2024-01-01,2024-12-31", name: "2024" },
  { slug: "2023-01-01,2023-12-31", name: "2023" },
  { slug: "2022-01-01,2022-12-31", name: "2022" },
  { slug: "2021-01-01,2021-12-31", name: "2021" },
  { slug: "2020-01-01,2020-12-31", name: "2020" },
  { slug: "2019-01-01,2019-12-31", name: "2019" },
  { slug: "2018-01-01,2018-12-31", name: "2018" },
  { slug: "2017-01-01,2017-12-31", name: "2017" },
  { slug: "2016-01-01,2016-12-31", name: "2016" },
  { slug: "2015-01-01,2015-12-31", name: "2015" },
  { slug: "2014-01-01,2014-12-31", name: "2014" },
  { slug: "2013-01-01,2013-12-31", name: "2013" },
  { slug: "2012-01-01,2012-12-31", name: "2012" },
  { slug: "2011-01-01,2011-12-31", name: "2011" },
  { slug: "2010-01-01,2010-12-31", name: "2010" },
  { slug: "2009-01-01,2009-12-31", name: "2009" },
  { slug: "2008-01-01,2008-12-31", name: "2008" },
  { slug: "2007-01-01,2007-12-31", name: "2007" },
  { slug: "2006-01-01,2006-12-31", name: "2006" },
  { slug: "2005-01-01,2005-12-31", name: "2005" },
  { slug: "2004-01-01,2004-12-31", name: "2004" },
  { slug: "2003-01-01,2003-12-31", name: "2003" },
  { slug: "2002-01-01,2002-12-31", name: "2002" },
  { slug: "2001-01-01,2001-12-31", name: "2001" },
  { slug: "2000-01-01,2000-12-31", name: "2000" },
  { value: "1999-01-01,1999-12-31", label: "1999" },
  { value: "1998-01-01,1998-12-31", label: "1998" },
  { value: "1997-01-01,1997-12-31", label: "1997" },
  { value: "1996-01-01,1996-12-31", label: "1996" },
  { value: "1995-01-01,1995-12-31", label: "1995" },
  { value: "1994-01-01,1994-12-31", label: "1994" },
  { value: "1993-01-01,1993-12-31", label: "1993" },
  { value: "1992-01-01,1992-12-31", label: "1992" },
  { value: "1991-01-01,1991-12-31", label: "1991" },
  { value: "1990-01-01,1990-12-31", label: "1990" },
  { value: "1989-01-01,1989-12-31", label: "1989" },
  { value: "1988-01-01,1988-12-31", label: "1988" },
  { value: "1987-01-01,1987-12-31", label: "1987" },
  { value: "1986-01-01,1986-12-31", label: "1986" },
  { value: "1985-01-01,1985-12-31", label: "1985" },
  { value: "1984-01-01,1984-12-31", label: "1984" },
  { value: "1983-01-01,1983-12-31", label: "1983" },
  { value: "1982-01-01,1982-12-31", label: "1982" },
  { value: "1981-01-01,1981-12-31", label: "1981" },
  { value: "1980-01-01,1980-12-31", label: "1980" },
  { value: "1977-01-01,1979-12-31", label: "1979" },
  { value: "1976-01-01,1978-12-31", label: "1978" },
  { value: "1975-01-01,1977-12-31", label: "1977" },
  { value: "1974-01-01,1976-12-31", label: "1976" },
  { value: "1973-01-01,1975-12-31", label: "1975" },
  { value: "1972-01-01,1974-12-31", label: "1974" },
  { value: "1971-01-01,1973-12-31", label: "1973" },
  { value: "1970-01-01,1972-12-31", label: "1972" },
  { value: "1969-01-01,1971-12-31", label: "1971" },
  { value: "1968-01-01,1970-12-31", label: "1970" },
]

export const storesOption = [
  {
    id: 1,
    name: "Steam",
    slug: "steam",
    games_count: 102503,
  },
  {
    id: 3,
    name: "PlayStation Store",
    slug: "playstation-store",
    games_count: 7985,
  },
  {
    id: 2,
    name: "Xbox Store",
    slug: "xbox-store",
    games_count: 4886,
  },
  {
    id: 4,
    name: "App Store",
    slug: "apple-appstore",
    games_count: 75575,
  },
  {
    id: 5,
    name: "GOG",
    slug: "gog",
    games_count: 6457,
  },
  {
    id: 6,
    name: "Nintendo Store",
    slug: "nintendo",
    games_count: 9074,
  },
  {
    id: 7,
    name: "Xbox 360 Store",
    slug: "xbox360",
    games_count: 1915,
  },
  {
    id: 8,
    name: "Google Play",
    slug: "google-play",
    games_count: 17103,
  },
  {
    id: 9,
    name: "itch.io",
    slug: "itch",
    games_count: 654166,
  },
  {
    id: 11,
    name: "Epic Games",
    slug: "epic-games",
    games_count: 1359,
  },
]

export const genresList = {
  results: [
    {
      id: 4,
      name: "Action",
      slug: "action",
      games_count: 183493,
      image_background:
        "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
    },
    {
      id: 51,
      name: "Indie",
      slug: "indie",
      games_count: 71440,
      image_background:
        "https://media.rawg.io/media/games/d1f/d1f872a48286b6b751670817d5c1e1be.jpg",
    },
    {
      id: 3,
      name: "Adventure",
      slug: "adventure",
      games_count: 143292,
      image_background:
        "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg",
    },
    {
      id: 5,
      name: "RPG",
      slug: "role-playing-games-rpg",
      games_count: 57774,
      image_background:
        "https://media.rawg.io/media/games/530/5302dd22a190e664531236ca724e8726.jpg",
    },
    {
      id: 10,
      name: "Strategy",
      slug: "strategy",
      games_count: 58026,
      image_background:
        "https://media.rawg.io/media/games/095/0953bf01cd4e4dd204aba85489ac9868.jpg",
    },
    {
      id: 2,
      name: "Shooter",
      slug: "shooter",
      games_count: 59528,
      image_background:
        "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg",
    },
    {
      id: 40,
      name: "Casual",
      slug: "casual",
      games_count: 57478,
      image_background:
        "https://media.rawg.io/media/screenshots/4f4/4f4722571e32954af43a4508607c1748.jpg",
    },
    {
      id: 14,
      name: "Simulation",
      slug: "simulation",
      games_count: 71632,
      image_background:
        "https://media.rawg.io/media/games/1f5/1f5ddf7199f2778ff83663b93b5cb330.jpg",
    },
    {
      id: 7,
      name: "Puzzle",
      slug: "puzzle",
      games_count: 97320,
      image_background:
        "https://media.rawg.io/media/games/74d/74dafeb9a442b87b9dd4a1d4a2faa37b.jpg",
    },
    {
      id: 11,
      name: "Arcade",
      slug: "arcade",
      games_count: 22651,
      image_background:
        "https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg",
    },
    {
      id: 83,
      name: "Platformer",
      slug: "platformer",
      games_count: 100826,
      image_background:
        "https://media.rawg.io/media/games/e0f/e0f05a97ff926acf4c8f43e0849b6832.jpg",
    },
    {
      id: 1,
      name: "Racing",
      slug: "racing",
      games_count: 25063,
      image_background:
        "https://media.rawg.io/media/games/19a/19a512a8c1293c22894b7364e1405ec1.jpg",
    },
    {
      id: 59,
      name: "Massively Multiplayer",
      slug: "massively-multiplayer",
      games_count: 3850,
      image_background:
        "https://media.rawg.io/media/games/11f/11fd681c312c14644ab360888dba3486.jpg",
    },
    {
      id: 15,
      name: "Sports",
      slug: "sports",
      games_count: 21821,
      image_background:
        "https://media.rawg.io/media/screenshots/28b/28bec9939d190ba619cad0693ebe304d.jpg",
    },
    {
      id: 6,
      name: "Fighting",
      slug: "fighting",
      games_count: 11760,
      image_background:
        "https://media.rawg.io/media/games/297/297a51aa1f0999016d5a35e2e1d6d8ab.jpg",
    },
    {
      id: 19,
      name: "Family",
      slug: "family",
      games_count: 5404,
      image_background:
        "https://media.rawg.io/media/games/9a1/9a18c226cf379272c698f26d2b79b3da.jpg",
    },
    {
      id: 28,
      name: "Board Games",
      slug: "board-games",
      games_count: 8382,
      image_background:
        "https://media.rawg.io/media/screenshots/c25/c252e2023355e98787402c4bdd90f775.jpeg",
    },
    {
      id: 34,
      name: "Educational",
      slug: "educational",
      games_count: 15684,
      image_background:
        "https://media.rawg.io/media/games/60a/60a0b8f88184f25621b498c2ee1ebb05.jpg",
    },
    {
      id: 17,
      name: "Card",
      slug: "card",
      games_count: 4533,
      image_background:
        "https://media.rawg.io/media/screenshots/40f/40fee8fed4bc26960004731a549578eb.jpeg",
    },
  ],
}

export const platformData = {
  results: [
    {
      id: 1,
      name: "PC",
      slug: "pc",
      platforms: [
        {
          id: 4,
          name: "PC",
          slug: "pc",
          games_count: 539197,
          image_background:
            "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 2,
      name: "PlayStation",
      slug: "playstation",
      platforms: [
        {
          id: 187,
          name: "PlayStation 5",
          slug: "playstation5",
          games_count: 1147,
          image_background:
            "https://media.rawg.io/media/games/9fb/9fbf956a16249def7625ab5dc3d09515.jpg",
          image: null,
          year_start: 2020,
          year_end: null,
        },
        {
          id: 18,
          name: "PlayStation 4",
          slug: "playstation4",
          games_count: 6853,
          image_background:
            "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 16,
          name: "PlayStation 3",
          slug: "playstation3",
          games_count: 3167,
          image_background:
            "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 15,
          name: "PlayStation 2",
          slug: "playstation2",
          games_count: 2051,
          image_background:
            "https://media.rawg.io/media/games/9f1/9f14ee1ccd4995ba93be9b80d0ee30d7.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 27,
          name: "PlayStation",
          slug: "playstation1",
          games_count: 1675,
          image_background:
            "https://media.rawg.io/media/games/a84/a84dc4980063ce934705ea5d8d241939.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 19,
          name: "PS Vita",
          slug: "ps-vita",
          games_count: 1448,
          image_background:
            "https://media.rawg.io/media/games/283/283e7e600366b0da7021883d27159b27.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 17,
          name: "PSP",
          slug: "psp",
          games_count: 1372,
          image_background:
            "https://media.rawg.io/media/games/22b/22b61e8391b252cbd9be3317709cc68d.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 3,
      name: "Xbox",
      slug: "xbox",
      platforms: [
        {
          id: 1,
          name: "Xbox One",
          slug: "xbox-one",
          games_count: 5660,
          image_background:
            "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 186,
          name: "Xbox Series S/X",
          slug: "xbox-series-x",
          games_count: 1004,
          image_background:
            "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
          image: null,
          year_start: 2020,
          year_end: null,
        },
        {
          id: 14,
          name: "Xbox 360",
          slug: "xbox360",
          games_count: 2806,
          image_background:
            "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 80,
          name: "Xbox",
          slug: "xbox-old",
          games_count: 739,
          image_background:
            "https://media.rawg.io/media/games/b1d/b1de33eca64ad293702d9554f5ac5cd5.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 4,
      name: "iOS",
      slug: "ios",
      platforms: [
        {
          id: 3,
          name: "iOS",
          slug: "ios",
          games_count: 77373,
          image_background:
            "https://media.rawg.io/media/games/d1f/d1f872a48286b6b751670817d5c1e1be.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 8,
      name: "Android",
      slug: "android",
      platforms: [
        {
          id: 21,
          name: "Android",
          slug: "android",
          games_count: 52400,
          image_background:
            "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 5,
      name: "Apple Macintosh",
      slug: "mac",
      platforms: [
        {
          id: 5,
          name: "macOS",
          slug: "macos",
          games_count: 105140,
          image_background:
            "https://media.rawg.io/media/games/6fc/6fcf4cd3b17c288821388e6085bb0fc9.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 55,
          name: "Classic Macintosh",
          slug: "macintosh",
          games_count: 675,
          image_background:
            "https://media.rawg.io/media/games/3a8/3a82d7f5c90ab082fe475e28d58bee8b.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 41,
          name: "Apple II",
          slug: "apple-ii",
          games_count: 424,
          image_background:
            "https://media.rawg.io/media/screenshots/3d2/3d2bb57b39e2efa39d1c385585b2ea8b.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 6,
      name: "Linux",
      slug: "linux",
      platforms: [
        {
          id: 6,
          name: "Linux",
          slug: "linux",
          games_count: 77924,
          image_background:
            "https://media.rawg.io/media/games/00d/00d374f12a3ab5f96c500a2cfa901e15.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 7,
      name: "Nintendo",
      slug: "nintendo",
      platforms: [
        {
          id: 7,
          name: "Nintendo Switch",
          slug: "nintendo-switch",
          games_count: 5537,
          image_background:
            "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 8,
          name: "Nintendo 3DS",
          slug: "nintendo-3ds",
          games_count: 1693,
          image_background:
            "https://media.rawg.io/media/games/83b/83b59a9d512bec8bc8bda6b539b215b2.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 9,
          name: "Nintendo DS",
          slug: "nintendo-ds",
          games_count: 2483,
          image_background:
            "https://media.rawg.io/media/games/9f7/9f750cb69a31a42648f45e3681abed3a.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 13,
          name: "Nintendo DSi",
          slug: "nintendo-dsi",
          games_count: 37,
          image_background:
            "https://media.rawg.io/media/screenshots/078/078629e997421ca28e9098bd7a87cb10.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 10,
          name: "Wii U",
          slug: "wii-u",
          games_count: 1124,
          image_background:
            "https://media.rawg.io/media/games/85c/85c8ae70e7cdf0105f06ef6bdce63b8b.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 11,
          name: "Wii",
          slug: "wii",
          games_count: 2226,
          image_background:
            "https://media.rawg.io/media/games/d03/d030347839f74454afcd1008248b08ae.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 105,
          name: "GameCube",
          slug: "gamecube",
          games_count: 634,
          image_background:
            "https://media.rawg.io/media/games/33d/33d72d63a624f17431d39922359c7bf8.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 83,
          name: "Nintendo 64",
          slug: "nintendo-64",
          games_count: 363,
          image_background:
            "https://media.rawg.io/media/screenshots/c1f/c1fd8b15793743563367688b3dd5faa6.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 24,
          name: "Game Boy Advance",
          slug: "game-boy-advance",
          games_count: 954,
          image_background:
            "https://media.rawg.io/media/games/fd6/fd6e2692bd4eeb470bccbf282155839b.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 43,
          name: "Game Boy Color",
          slug: "game-boy-color",
          games_count: 419,
          image_background:
            "https://media.rawg.io/media/screenshots/6fe/6fee3969b73bfccd935517c0c15826d8.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 26,
          name: "Game Boy",
          slug: "game-boy",
          games_count: 612,
          image_background:
            "https://media.rawg.io/media/games/e40/e4043e92866d08ec9fdd212dcd3a1224.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 79,
          name: "SNES",
          slug: "snes",
          games_count: 972,
          image_background:
            "https://media.rawg.io/media/games/0df/0dfe8852fa43d58cbdeb973765a9828d.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 49,
          name: "NES",
          slug: "nes",
          games_count: 1000,
          image_background:
            "https://media.rawg.io/media/screenshots/092/092fc1910f067a95a07c0fbfdbe25f03.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 9,
      name: "Atari",
      slug: "atari",
      platforms: [
        {
          id: 28,
          name: "Atari 7800",
          slug: "atari-7800",
          games_count: 64,
          image_background:
            "https://media.rawg.io/media/screenshots/565/56504b28b184dbc630a7de118e39d822.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 31,
          name: "Atari 5200",
          slug: "atari-5200",
          games_count: 64,
          image_background:
            "https://media.rawg.io/media/screenshots/678/6786598cba3939d48ed60cbd1a3723f4.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 23,
          name: "Atari 2600",
          slug: "atari-2600",
          games_count: 294,
          image_background:
            "https://media.rawg.io/media/screenshots/ff6/ff623993a854663931c1e78d72a16a5a.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 22,
          name: "Atari Flashback",
          slug: "atari-flashback",
          games_count: 30,
          image_background:
            "https://media.rawg.io/media/screenshots/2aa/2aa07f58491e14b0183333f8956bc802.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 25,
          name: "Atari 8-bit",
          slug: "atari-8-bit",
          games_count: 308,
          image_background:
            "https://media.rawg.io/media/screenshots/038/0385a47d3a43b218204268af5361a19e.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 34,
          name: "Atari ST",
          slug: "atari-st",
          games_count: 836,
          image_background:
            "https://media.rawg.io/media/games/32d/32d851318b042aba3df62e52d868d599.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 46,
          name: "Atari Lynx",
          slug: "atari-lynx",
          games_count: 57,
          image_background:
            "https://media.rawg.io/media/screenshots/d71/d71b68d3f6b1810bc9d64d7aea746d30.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 50,
          name: "Atari XEGS",
          slug: "atari-xegs",
          games_count: 22,
          image_background:
            "https://media.rawg.io/media/screenshots/769/7691726d70c23c029903df08858df001.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 112,
          name: "Jaguar",
          slug: "jaguar",
          games_count: 39,
          image_background:
            "https://media.rawg.io/media/screenshots/241/24188738ed8141b03c767e6bbba28401.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 10,
      name: "Commodore / Amiga",
      slug: "commodore-amiga",
      platforms: [
        {
          id: 166,
          name: "Commodore / Amiga",
          slug: "commodore-amiga",
          games_count: 2082,
          image_background:
            "https://media.rawg.io/media/games/8fc/8fcc2ff5c7bcdb58199b1a4326817ceb.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 11,
      name: "SEGA",
      slug: "sega",
      platforms: [
        {
          id: 167,
          name: "Genesis",
          slug: "genesis",
          games_count: 840,
          image_background:
            "https://media.rawg.io/media/games/a9a/a9a2472f862b041d2980103ddbb61c91.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 107,
          name: "SEGA Saturn",
          slug: "sega-saturn",
          games_count: 371,
          image_background:
            "https://media.rawg.io/media/games/8fc/8fcc2ff5c7bcdb58199b1a4326817ceb.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 119,
          name: "SEGA CD",
          slug: "sega-cd",
          games_count: 163,
          image_background:
            "https://media.rawg.io/media/screenshots/9a0/9a01b32ce1a3e0576018a2580e32cf26.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 117,
          name: "SEGA 32X",
          slug: "sega-32x",
          games_count: 46,
          image_background:
            "https://media.rawg.io/media/screenshots/d9f/d9f308b5d824ae8f047edc0a998a587b.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 74,
          name: "SEGA Master System",
          slug: "sega-master-system",
          games_count: 231,
          image_background:
            "https://media.rawg.io/media/screenshots/c6b/c6b5bccfd2f89362387ea6d61ba81cd1.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 106,
          name: "Dreamcast",
          slug: "dreamcast",
          games_count: 364,
          image_background:
            "https://media.rawg.io/media/games/fd7/fd794a9f0ffe816038d981b3acc3eec9.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
        {
          id: 77,
          name: "Game Gear",
          slug: "game-gear",
          games_count: 224,
          image_background:
            "https://media.rawg.io/media/games/32d/32d851318b042aba3df62e52d868d599.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 12,
      name: "3DO",
      slug: "3do",
      platforms: [
        {
          id: 111,
          name: "3DO",
          slug: "3do",
          games_count: 99,
          image_background:
            "https://media.rawg.io/media/screenshots/97c/97cd94d7d6d89a12ed562d3a4e40c4a5.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 13,
      name: "Neo Geo",
      slug: "neo-geo",
      platforms: [
        {
          id: 12,
          name: "Neo Geo",
          slug: "neogeo",
          games_count: 123,
          image_background:
            "https://media.rawg.io/media/screenshots/4cc/4ccee6c3e367f4dd94d19d4857dfc1c9.jpeg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
    {
      id: 14,
      name: "Web",
      slug: "web",
      platforms: [
        {
          id: 171,
          name: "Web",
          slug: "web",
          games_count: 260083,
          image_background:
            "https://media.rawg.io/media/screenshots/058/058195b9ed4c077838a3981eef800069.jpg",
          image: null,
          year_start: null,
          year_end: null,
        },
      ],
    },
  ],
}
