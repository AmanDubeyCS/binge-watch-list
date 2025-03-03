import { Mail } from "lucide-react"
import { Logo } from "../Logo"

export const FooterSection = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              Track all your entertainment in one beautiful, organized space.
            </p>
            {/* <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="size-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div> */}
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold">Media Types</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/movies"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="/tv"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  TV Shows
                </a>
              </li>
              <li>
                <a
                  href="/anime"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Anime
                </a>
              </li>
              <li>
                <a
                  href="/manga"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Manga
                </a>
              </li>
              <li>
                <a
                  href="/games"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Video Games
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold">Features</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Track Progress
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Create Lists
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Rate Content
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Share Profile
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Get Recommendations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/anime/discover"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Anime Discover
                </a>
              </li>
              <li>
                <a
                  href="/game/discover"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  game Descover
                </a>
              </li>
              <li>
                <a
                  href="/tv/discover"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Tv Show Discover
                </a>
              </li>
              <li>
                <a
                  href="/movie/descover"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  movie Descover
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MyBingeList. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-4" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
