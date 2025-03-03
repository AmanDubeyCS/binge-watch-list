export const HeroSection = () => {
  return (
    <section
      className="relative flex min-h-[calc(100vh-88px)] flex-col overflow-hidden"
      id="hero"
    >
      <div className="container mx-auto px-4 py-10 md:px-6 md:py-16 lg:py-20">
        <div
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
          data-aos="fade-up"
        >
          <div className="mb-2 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
            <span>All your entertainment in one place</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl lg:leading-none">
            All your
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              media collections
            </span>
            <br />
            in one place
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Track, organize, and discover your next favorite content across
            movies, TV shows, anime, manga, and games — all in a single,
            beautifully designed experience.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <a
              href="/home"
              className="inline-flex h-12 min-w-36 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:scale-105 hover:from-primary/90 hover:to-accent/90 dark:shadow-accent/20"
            >
              Browse Content
            </a>
            <a
              href="#features"
              className="inline-flex h-12 min-w-36 items-center justify-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-float flex-col items-center gap-2">
        <div className="h-8 w-[2px] bg-gradient-to-b from-white/0 via-foreground/50 to-foreground/80 dark:from-white/0 dark:via-foreground/30 dark:to-foreground/60"></div>
        <div className="size-3 rotate-45 border-b-2 border-r-2 border-foreground/80 dark:border-foreground/60"></div>
      </div>
    </section>
  )
}
