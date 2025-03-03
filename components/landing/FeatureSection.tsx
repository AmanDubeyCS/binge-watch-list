import {
  Film,
  Tv,
  Book,
  Gamepad,
  ListChecks,
  Share2,
  BarChart3,
  Palette,
} from "lucide-react"
// import { TabletFrame, DeviceContent } from "./DeviceFrames";

export const FeatureSection = () => {
  const features = [
    {
      icon: <Film className="size-10 text-blue-500" />,
      title: "Movies",
      description:
        "Get ratings and detailed information from TMDB, IMDB, and more.",
      status: ["Watched", "Plan to Watch", "Dropped"],
    },
    {
      icon: <Tv className="size-10 text-red-500" />,
      title: "TV Shows & Anime",
      description:
        "Track episodes and seasons with data from the best sources.",
      status: ["Watching", "Completed", "Plan to Watch", "Dropped"],
    },
    {
      icon: <Book className="size-10 text-green-500" />,
      title: "Manga & Comics",
      description:
        "Stay updated with the latest chapters from MangaDex and MangaUpdates.",
      status: ["Reading", "Plan to Read", "On Hold", "Dropped"],
    },
    {
      icon: <Gamepad className="size-10 text-purple-500" />,
      title: "Video Games",
      description: "Discover and track games with ratings from RAWG and IGDB.",
      status: ["Playing", "Plan to Play", "Dropped"],
    },
    {
      icon: <ListChecks className="size-10 text-indigo-500" />,
      title: "Custom Lists",
      description:
        "Create and organize personalized collections across all media types.",
      status: [],
    },
    {
      icon: <BarChart3 className="size-10 text-amber-500" />,
      title: "Progress Tracking",
      description:
        "Keep track of episodes, chapters, and game completion in one place.",
      status: [],
    },
    {
      icon: <Share2 className="size-10 text-rose-500" />,
      title: "Social Sharing",
      description:
        "Compare and share profiles with friends to discover new content.",
      status: [],
    },
    {
      icon: <Palette className="size-10 text-teal-500" />,
      title: "Personalization",
      description: "Customize your experience with both light and dark themes.",
      status: [],
    },
  ]

  return (
    <section className="relative overflow-hidden py-20 lg:py-32" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <span>Comprehensive Features</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            All your entertainment,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              perfectly organized
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            BingeList brings together all your favorite media in one beautifully
            designed experience, with powerful features to organize your
            entertainment life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/70 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="mb-4 text-muted-foreground">
                {feature.description}
              </p>

              <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 rounded-b-2xl bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          ))}
        </div>

        <div className="relative mt-24 lg:mt-32">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              How It{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Track your entertainment journey with a seamless and intuitive
              experience.
            </p>
          </div>

          <div
            className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20"
            id="how-it-works"
          >
            <div className="order-2 flex-1 lg:order-1">
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "Search & Discover",
                    description:
                      "Find any movie, show, manga, or game using our comprehensive database powered by multiple sources.",
                  },
                  {
                    number: "02",
                    title: "Build Your Collection",
                    description:
                      "Add items to your list with custom status tracking for every type of media.",
                  },
                  {
                    number: "03",
                    title: "Track Your Progress",
                    description:
                      "Update your watching, reading, or playing progress with a simple interface.",
                  },
                  {
                    number: "04",
                    title: "Discover & Share",
                    description:
                      "Find recommendations based on your taste and share your profile with friends.",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative pl-16">
                    <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                      <span className="font-mono font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 flex flex-1 justify-center lg:order-2">
              {/* <TabletFrame className="rotate-1 shadow-2xl">
                <DeviceContent type="tablet" />
              </TabletFrame> */}

              <div className="absolute -z-10">
                <div className="absolute -left-20 -top-20 size-64 animate-pulse-slow rounded-full bg-primary/20 opacity-60 blur-3xl"></div>
                <div
                  className="absolute -bottom-16 -right-16 size-64 animate-pulse-slow rounded-full bg-accent/20 opacity-60 blur-3xl"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
