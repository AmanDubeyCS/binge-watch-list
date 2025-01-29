import Link from "next/link"
import React from "react"

export function MainLandingPage() {
  return (
    <main className="relative flex-1 overflow-y-auto bg-neutral-900 text-white">
      {/* <!-- Background Grid of Cards --> */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
          <div className="h-48 rounded-lg bg-neutral-800"></div>
        </div>
      </div> */}
      <div className="mx-auto max-w-[1600px]">
        <div>
          <section id="hero" className="relative overflow-hidden">
            {/* <!-- Hero Content --> */}
            <div className="relative flex min-h-[80vh] items-center">
              <div className="container mx-auto flex justify-center py-16">
                <div className="flex max-w-3xl flex-col items-center justify-center text-center">
                  <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                    Track Everything You Watch, Read &amp; Play
                  </h1>

                  {/* <p className="mb-8 text-lg text-neutral-300 md:text-2xl flex flex-col">
                    One platform for all your entertainment tracking needs.
                    <span>Movies, Shows, Manga, and Games</span>
                    <span>all in one place.</span>
                  </p> */}

                  {/* <!-- Feature Pills --> */}
                  <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-purple-400">
                      Shows &amp; Anime
                    </span>
                    <span className="rounded-full border border-pink-500/30 bg-pink-500/20 px-4 py-2 text-pink-400">
                      Movies
                    </span>
                    <span className="rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-400">
                      Manga
                    </span>
                    <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-blue-400">
                      Games
                    </span>
                  </div>

                  {/* <!-- CTA Buttons --> */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={"/home"}
                      className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Floating Platform Logos --> */}
            {/* <div className="absolute bottom-0 right-0 hidden p-8 lg:block">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-neutral-400">
                    IMDB
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-neutral-400">
                    TMDB
                  </div>
                </div>
                <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 backdrop-blur-sm">
                  <div className="text-sm font-semibold text-neutral-400">
                    RAWG
                  </div>
                </div>
              </div>
            </div> */}
          </section>
        </div>
        <div>
          <section id="features" className="bg-neutral-900 py-20">
            <div className="container mx-auto">
              {/* <!-- Section Header --> */}
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">
                  Powerful Features
                </h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                  Track, manage, and discover all your entertainment in one
                  place with our comprehensive suite of features.
                </p>
              </div>

              {/* <!-- Features Grid --> */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* <!-- Universal Tracking --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-purple-500/50">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-purple-500/20">
                    <svg
                      className="size-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Universal Tracking
                  </h3>
                  <p className="text-neutral-400">
                    Keep track of your movies, shows, manga, and games all in
                    one place with customizable status options.
                  </p>
                </div>

                {/* <!-- Progress Tracking --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-pink-500/50">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-pink-500/20">
                    <svg
                      className="size-6 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Progress Tracking
                  </h3>
                  <p className="text-neutral-400">
                    Monitor your progress through series, seasons, chapters, and
                    game completion status.
                  </p>
                </div>

                {/* <!-- Integrated Ratings --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-blue-500/50">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-blue-500/20">
                    <svg
                      className="size-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Integrated Ratings
                  </h3>
                  <p className="text-neutral-400">
                    Access ratings and reviews from IMDB, TMDB, MangaDex, RAWG,
                    and more in one place.
                  </p>
                </div>

                {/* <!-- Profile Sharing --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-green-500/50">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-green-500/20">
                    <svg
                      className="size-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Profile Sharing
                  </h3>
                  <p className="text-neutral-400">
                    Share your watchlist and progress with friends, compare
                    profiles, and discover new content.
                  </p>
                </div>

                {/* <!-- Custom Lists --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-red-500/50">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-red-500/20">
                    <svg
                      className="size-6 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Custom Lists
                  </h3>
                  <p className="text-neutral-400">
                    Create personalized lists for different genres, moods, or
                    categories across all media types.
                  </p>
                </div>

                {/* <!-- Detailed Information --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-yellow-500/50">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-yellow-500/20">
                    <svg
                      className="size-6 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Detailed Information
                  </h3>
                  <p className="text-neutral-400">
                    Access comprehensive details about cast, characters,
                    episodes, chapters, and more.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="ContentCategories" className="bg-neutral-900 py-20">
            <div className="container mx-auto">
              {/* <!-- Section Header --> */}
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">
                  Track All Your Entertainment
                </h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                  Comprehensive tracking across all your favorite entertainment
                  categories
                </p>
              </div>

              {/* <!-- Categories Grid --> */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* <!-- Movies & Shows --> */}
                <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/50 transition-all duration-300 hover:border-purple-500/50">
                  <div className="p-8">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          Anime &amp; Shows
                        </h3>
                        <p className="text-neutral-400">
                          Track your show journey
                        </p>
                      </div>
                      <div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/20">
                        <svg
                          className="size-6 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Watching</span>
                        <div className="h-2 grow rounded-full bg-purple-500/20">
                          <div className="h-2 w-3/4 rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Plan to watch</span>
                        <div className="h-2 grow rounded-full bg-purple-500/20">
                          <div className="h-2 w-1/4 rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Completed</span>
                        <div className="h-2 grow rounded-full bg-purple-500/20">
                          <div className="h-2 w-1/2 rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Dropped</span>
                        <div className="h-2 grow rounded-full bg-purple-500/20">
                          <div className="h-2 w-1/2 rounded-full bg-purple-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Manga & Anime --> */}
                <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/50 transition-all duration-300 hover:border-pink-500/50">
                  <div className="p-8">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          Manga
                        </h3>
                        <p className="text-neutral-400">
                          Follow your reading progress
                        </p>
                      </div>
                      <div className="flex size-12 items-center justify-center rounded-lg bg-pink-500/20">
                        <svg
                          className="size-6 text-pink-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Reading</span>
                        <div className="h-2 grow rounded-full bg-pink-500/20">
                          <div className="h-2 w-1/2 rounded-full bg-pink-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Plan to Read</span>
                        <div className="h-2 grow rounded-full bg-pink-500/20">
                          <div className="h-2 w-3/4 rounded-full bg-pink-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Completed</span>
                        <div className="h-2 grow rounded-full bg-pink-500/20">
                          <div className="h-2 w-1/4 rounded-full bg-pink-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Dropped</span>
                        <div className="h-2 grow rounded-full bg-pink-500/20">
                          <div className="h-2 w-1/4 rounded-full bg-pink-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/50 transition-all duration-300 hover:border-pink-500/50">
                  <div className="p-8">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          Movies
                        </h3>
                        <p className="text-neutral-400">
                          Track your movie journey
                        </p>
                      </div>
                      <div className="flex size-12 items-center justify-center rounded-lg bg-red-500/20">
                        <svg
                          className="size-6 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">i&apos;ve seen this</span>
                        <div className="h-2 grow rounded-full bg-red-500/20">
                          <div className="h-2 w-1/2 rounded-full bg-red-400"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Plan to watch</span>
                        <div className="h-2 grow rounded-full bg-red-500/20">
                          <div className="h-2 w-3/4 rounded-full bg-red-400"></div>
                        </div>
                      </div>
                      {/* <div className="flex items-center text-neutral-300">
                        <span className="w-28">Completed</span>
                        <div className="h-2 flex-grow rounded-full bg-pink-500/20">
                          <div className="h-2 w-1/4 rounded-full bg-pink-500"></div>
                        </div>
                      </div> */}
                      <div className="flex items-center text-neutral-300">
                        <span className="w-28">Dropped</span>
                        <div className="h-2 grow rounded-full bg-red-500/20">
                          <div className="h-2 w-1/4 rounded-full bg-red-400"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Games --> */}
                <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/50 transition-all duration-300 hover:border-blue-500/50">
                  <div className="p-8">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          Games
                        </h3>
                        <p className="text-neutral-400">
                          Track your gaming adventures
                        </p>
                      </div>
                      <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/20">
                        <svg
                          className="size-6 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-3">
                        <div className="flex items-center text-neutral-300">
                          <span className="w-28">Playing</span>
                          <div className="h-2 grow rounded-full bg-blue-500/20">
                            <div className="h-2 w-1/4 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-neutral-300">
                          <span className="w-28">Completed</span>
                          <div className="h-2 grow rounded-full bg-blue-500/20">
                            <div className="h-2 w-3/4 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-neutral-300">
                          <span className="w-28">Plan to</span>
                          <div className="h-2 grow rounded-full bg-blue-500/20">
                            <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="HowItWorks" className="bg-neutral-900 py-20">
            <div className="container mx-auto">
              {/* <!-- Section Header --> */}
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">
                  How It Works
                </h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                  Track your entertainment journey in three simple steps
                </p>
              </div>

              {/* <!-- Steps --> */}
              <div className="relative">
                {/* <!-- Connection Line --> */}
                <div className="absolute inset-x-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 lg:block"></div>

                <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-3">
                  {/* <!-- Step 1 --> */}
                  <div className="relative">
                    <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-purple-500/50">
                      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-xl bg-purple-500/20">
                        <span className="text-2xl font-bold text-purple-400">
                          1
                        </span>
                      </div>
                      <h3 className="mb-4 text-center text-xl font-bold text-white">
                        Create Your Account
                      </h3>
                      <p className="text-center text-neutral-400">
                        Sign up and customize your profile to start tracking
                        your entertainment journey across all platforms.
                      </p>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center text-neutral-300">
                          <svg
                            className="mr-2 size-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span>Personalized dashboard</span>
                        </div>
                        <div className="flex items-center text-neutral-300">
                          <svg
                            className="mr-2 size-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span>Cross-platform tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Step 2 --> */}
                  <div className="relative">
                    <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-pink-500/50">
                      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-xl bg-pink-500/20">
                        <span className="text-2xl font-bold text-pink-400">
                          2
                        </span>
                      </div>
                      <h3 className="mb-4 text-center text-xl font-bold text-white">
                        Add Your Content
                      </h3>
                      <p className="text-center text-neutral-400">
                        Search and add your favorite shows, movies, manga, and
                        games to your personal lists.
                      </p>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center text-neutral-300">
                          <svg
                            className="mr-2 size-5 text-pink-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span>Integrated search system</span>
                        </div>
                        <div className="flex items-center text-neutral-300">
                          <svg
                            className="mr-2 size-5 text-pink-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span>Custom list creation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Step 3 --> */}
                  <div className="relative">
                    <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-blue-500/50">
                      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-xl bg-blue-500/20">
                        <span className="text-2xl font-bold text-blue-400">
                          3
                        </span>
                      </div>
                      <h3 className="mb-4 text-center text-xl font-bold text-white">
                        Track Progress
                      </h3>
                      <p className="text-center text-neutral-400">
                        Update your progress, set status, and share your journey
                        with other users.
                      </p>
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center text-neutral-300">
                          <svg
                            className="mr-2 size-5 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span>Progress tracking</span>
                        </div>
                        <div className="flex items-center text-neutral-300">
                          <svg
                            className="mr-2 size-5 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span>Profile sharing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="IntegratedPlatforms" className="bg-neutral-900 py-20">
            <div className="container mx-auto">
              {/* <!-- Section Header --> */}
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">
                  Integrated Platforms
                </h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                  Access ratings and information from all your favorite
                  entertainment databases
                </p>
              </div>

              {/* <!-- Platforms Grid --> */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* <!-- Movies & Shows Section --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6">
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-white">
                      Movies, Shows &amp; Anime
                    </h3>
                    <div className="space-y-4">
                      {/* <!-- IMDB --> */}
                      <div className="flex items-center rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-yellow-500/20">
                          <span className="font-bold text-yellow-400">
                            IMDB
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">IMDB Ratings</p>
                          <p className="text-sm text-neutral-400">
                            Comprehensive movie &amp; show ratings
                          </p>
                        </div>
                      </div>

                      {/* <!-- TMDB --> */}
                      <div className="flex items-center rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/20">
                          <span className="font-bold text-blue-400">TMDB</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">TMDB Data</p>
                          <p className="text-sm text-neutral-400">
                            Detailed cast &amp; crew information
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/20">
                          <span className="font-bold text-blue-400">MAL</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">MAL Data</p>
                          <p className="text-sm text-neutral-400">
                            Detailed Ratings and characters data
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Manga & Anime Section --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6">
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Manga</h3>
                    <div className="space-y-4">
                      {/* <!-- MangaDex --> */}
                      <div className="flex items-center rounded-lg border border-pink-500/20 bg-pink-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-pink-500/20">
                          <span className="font-bold text-pink-400">MDex</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">MangaDex</p>
                          <p className="text-sm text-neutral-400">
                            Latest manga updates &amp; ratings
                          </p>
                        </div>
                      </div>

                      {/* <!-- MangaUpdates --> */}
                      <div className="flex items-center rounded-lg border border-green-500/20 bg-green-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/20">
                          <span className="font-bold text-green-400">MU</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">MangaUpdates</p>
                          <p className="text-sm text-neutral-400">
                            Release tracking &amp; reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Games Section --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6">
                  <div className="mb-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Games</h3>
                    <div className="space-y-4">
                      {/* <!-- RAWG --> */}
                      <div className="flex items-center rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/20">
                          <span className="font-bold text-purple-400">
                            RAWG
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">
                            RAWG Database
                          </p>
                          <p className="text-sm text-neutral-400">
                            Extensive game information
                          </p>
                        </div>
                      </div>

                      {/* <!-- IGDB --> */}
                      <div className="flex items-center rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/20">
                          <span className="font-bold text-red-400">IGDB</span>
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-white">IGDB Data</p>
                          <p className="text-sm text-neutral-400">
                            Detailed game ratings &amp; reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Integration Features --> */}
              <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-800">
                    <svg
                      className="size-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-white">
                    Real-time Updates
                  </h4>
                  <p className="text-sm text-neutral-400">
                    Instant synchronization with all platforms
                  </p>
                </div>

                <div className="p-4 text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-800">
                    <svg
                      className="size-6 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-white">
                    Unified Data
                  </h4>
                  <p className="text-sm text-neutral-400">
                    All your content in one place
                  </p>
                </div>

                <div className="p-4 text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-800">
                    <svg
                      className="size-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-white">
                    Detailed Stats
                  </h4>
                  <p className="text-sm text-neutral-400">
                    Comprehensive analytics and tracking
                  </p>
                </div>

                <div className="p-4 text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-800">
                    <svg
                      className="size-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h4 className="mb-2 font-semibold text-white">
                    Smart Alerts
                  </h4>
                  <p className="text-sm text-neutral-400">
                    Never miss new releases
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="Testimonials" className="bg-neutral-900 py-20">
            <div className="container mx-auto">
              {/* <!-- Section Header --> */}
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">
                  What Users Say
                </h2>
                <p className="mx-auto max-w-2xl text-neutral-400">
                  Hear from our community of entertainment enthusiasts
                </p>
              </div>

              {/* <!-- Testimonials Grid --> */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* <!-- Testimonial 1 --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-purple-500/50">
                  <div className="mb-6 flex items-center">
                    <img
                      src="https://avatar.iran.liara.run/public/42"
                      alt="User Avatar"
                      className="size-12 rounded-full opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-white">
                        Alex Mitchell
                      </h4>
                      <p className="text-sm text-neutral-400">
                        Anime &amp; Manga Fan
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-neutral-300">
                    &quot;Finally, a platform that lets me track both my anime
                    watching and manga reading progress in one place. The
                    integration with MangaDex is seamless!&quot;
                  </p>
                  <div className="flex text-purple-400">
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                {/* <!-- Testimonial 2 --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-pink-500/50">
                  <div className="mb-6 flex items-center">
                    <img
                      src="https://avatar.iran.liara.run/public/24"
                      alt="User Avatar"
                      className="size-12 rounded-full opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-white">Sarah Chen</h4>
                      <p className="text-sm text-neutral-400">
                        Movie Enthusiast
                      </p>
                    </div>
                  </div>
                  <p className="mb-4 text-neutral-300">
                    &quot;The IMDB and TMDB integration is perfect! I love being
                    able to track my watched movies and get recommendations
                    based on my taste.&quot;
                  </p>
                  <div className="flex text-pink-400">
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                {/* <!-- Testimonial 3 --> */}
                <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 transition-all duration-300 hover:border-blue-500/50">
                  <div className="mb-6 flex items-center">
                    <img
                      src="https://avatar.iran.liara.run/public/13"
                      alt="User Avatar"
                      className="size-12 rounded-full opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-white">
                        Marcus Rodriguez
                      </h4>
                      <p className="text-sm text-neutral-400">Gaming Expert</p>
                    </div>
                  </div>
                  <p className="mb-4 text-neutral-300">
                    &quot;The RAWG and IGDB integration helps me keep track of
                    my gaming backlog. The progress tracking feature is exactly
                    what I needed!&quot;
                  </p>
                  <div className="flex text-blue-400">
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section id="CallToAction" className="bg-neutral-900 py-20">
            <div className="container mx-auto">
              <div className="relative overflow-hidden rounded-2xl">
                {/* <!-- Background Gradient --> */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-xl"></div>

                {/* <!-- Content Container --> */}
                <div className="relative p-8 md:p-16">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                      Start Tracking Your Entertainment Journey Today
                    </h2>

                    <p className="mb-8 text-xl text-neutral-200">
                      Join the first platform that brings all your favorite
                      entertainment tracking needs under one roof.
                    </p>
                    {/* 
                    <!-- Features List --> */}
                    <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                        <div className="mb-2 text-purple-400">
                          <svg
                            className="mx-auto size-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-white">Movies &amp; Shows</p>
                      </div>

                      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                        <div className="mb-2 text-pink-400">
                          <svg
                            className="mx-auto size-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-white">Manga &amp; Anime</p>
                      </div>

                      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                        <div className="mb-2 text-blue-400">
                          <svg
                            className="mx-auto size-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-white">Games</p>
                      </div>

                      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
                        <div className="mb-2 text-green-400">
                          <svg
                            className="mx-auto size-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-white">Track Progress</p>
                      </div>
                    </div>

                    {/* <!-- CTA Buttons --> */}
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                      <Link
                        href={"/home"}
                        className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="z-50">
          <footer
            id="Footer"
            className="border-t border-neutral-800 bg-neutral-900"
          >
            <div className="container mx-auto py-12">
              {/* <!-- Footer Grid --> */}
              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* <!-- Company Info --> */}
                <div>
                  <h3 className="mb-4 text-xl font-bold text-white">
                    BingeWatch
                  </h3>
                  <p className="mb-4 text-neutral-400">
                    Track all your entertainment in one place. Movies, Shows,
                    Manga, and Games - we&apos;ve got you covered.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-neutral-400 transition-colors hover:text-white"
                    >
                      <svg
                        className="size-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-neutral-400 transition-colors hover:text-white"
                    >
                      <svg
                        className="size-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-neutral-400 transition-colors hover:text-white"
                    >
                      <svg
                        className="size-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* <!-- Quick Links --> */}
                <div>
                  <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#hero"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#features"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#categories"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Categories
                      </a>
                    </li>
                    <li>
                      <a
                        href="#testimonials"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Testimonials
                      </a>
                    </li>
                  </ul>
                </div>

                {/* <!-- Resources --> */}
                <div>
                  <h4 className="mb-4 font-semibold text-white">Discover</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/anime/discover"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Anime
                      </a>
                    </li>
                    <li>
                      <a
                        href="/movies/discover"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Movies
                      </a>
                    </li>
                    <li>
                      <a
                        href="/games/discover"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Game
                      </a>
                    </li>
                    <li>
                      <a
                        href="/tv/discover"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        TV Shows
                      </a>
                    </li>
                  </ul>
                </div>

                {/* <!-- Legal --> */}
                {/* <div>
                  <h4 className="mb-4 font-semibold text-white">Legal</h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        GDPR
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>

              {/* <!-- Bottom Bar --> */}
              <div className="flex justify-center border-t border-neutral-800 pt-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                  <p className="text-sm text-neutral-400">
                    © 2024 BingeWatch. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
