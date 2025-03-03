"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { Star, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { genreMap } from "./ListContent"

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

const TWEEN_FACTOR_BASE = 0.84

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: any
  type?: string
}

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, type } = props
  const OPTIONS: EmblaOptionsType = { loop: true }
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const tweenFactor = useRef(0)
  const pathname = usePathname()
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === "scroll"

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const opacity = numberWithinRange(tweenValue, 0.7, 1).toString()
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    tweenOpacity(emblaApi)
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity)
  }, [emblaApi, tweenOpacity])

  const findLogo = (slideID: number) => {
    const findSlide = slides
      .find(
        (slide: { id: number; mal_id: number }) =>
          (slide.id || slide.mal_id) === slideID
      )
      .logos?.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en")
    return findSlide
  }

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {type === "manga" ? (
            <>
              {slides.map((manga: any, index: number) => {
                const image = manga.relationships.filter(
                  (data: { type: string }) => data.type === "cover_art"
                )
                return (
                  <div className="embla__slide" key={index}>
                    <Link
                      href={`${pathname}/${manga.id}`}
                      className="relative flex h-[350px] xs:h-[500px] md:h-[600px]"
                    >
                      <img
                        src={`/api/mangaImage/${manga.id}/${image[0].attributes.fileName}`}
                        alt={` backdrop`}
                        className="absolute top-0 aspect-video size-full rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="relative size-full rounded-lg">
                        <div className="flex size-full flex-col items-center gap-6 p-6 md:flex-row md:items-end md:p-10">
                          <div className="hidden h-[300px] shrink-0 overflow-hidden rounded-lg shadow-2xl xs:flex md:h-[350px] lg:h-[450px] lg:w-[300px]">
                            <Image
                              src={`/api/mangaImage/${manga.id}/${image[0].attributes.fileName}`}
                              alt="No Home Poster"
                              width={300}
                              height={450}
                              className="size-full object-cover"
                              priority
                            />
                          </div>

                          {/* Info Section */}
                          <div className="flex flex-1 flex-col justify-end space-y-4 text-white md:justify-end">
                            {/* Title and Badges */}
                            <div className="space-y-3">
                              <h1 className="text-center text-xl font-bold sm:text-2xl md:text-start md:text-5xl">
                                {manga.attributes?.title.en ||
                                  manga.attributes?.title.ja ||
                                  manga.attributes?.title["ja-ro"]}
                              </h1>
                              <div className="hidden flex-wrap gap-2 md:flex">
                                <Badge variant="secondary">
                                  {manga.attributes.status}
                                </Badge>
                                <Badge variant="secondary">Korean</Badge>
                                <Badge variant="secondary">
                                  {manga.attributes.year}
                                </Badge>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="hidden gap-4 text-sm md:flex">
                              <div className="flex items-center gap-1">
                                <Star className="size-4 text-yellow-400" />
                                <span>
                                  {manga.rating.rating?.average?.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="size-4" />
                                <span>{manga.rating.follows} follows</span>
                              </div>
                            </div>

                            {/* Description */}

                            <p className="line-clamp-2 text-sm text-gray-200 md:line-clamp-4 md:text-base">
                              {manga.attributes.description.en}
                            </p>

                            {/* Additional Info */}
                            <div className="mt-auto hidden flex-wrap gap-4 text-sm text-gray-300 md:flex">
                              <span>Status: {manga.attributes.status}</span>
                              <span>
                                Translation available in{" "}
                                {
                                  manga.attributes.availableTranslatedLanguages
                                    .length
                                }{" "}
                                languages
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </>
          ) : (
            <>
              {slides.map((slide: any, index: number) => {
                const logo = findLogo(slide.id)?.file_path
                return (
                  <div className="embla__slide" key={index}>
                    <Link
                      href={`${pathname}/${slide.id}`}
                      className="relative flex h-[350px] xs:h-[500px] md:h-[550px] xl:h-full"
                    >
                      <img
                        src={
                          slide.background_image ||
                          `https://image.tmdb.org/t/p/original${slide.backdrop_path || slide.backdrops?.[0].file_path}`
                        }
                        alt={`${slide.title} backdrop`}
                        className={cn(
                          "size-full rounded-lg object-cover",
                          type === "game" && "h-[650px]"
                        )}
                      />

                      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-black/40 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8">
                        <div className="container mx-auto">
                          <div className="flex flex-col items-center justify-center gap-4">
                            {logo ? (
                              <img
                                src={`https://image.tmdb.org/t/p/original${logo}`}
                                alt={`${slide.title} backdrop`}
                                className="max-h-[50px] max-w-[90%] rounded-lg object-cover sm:max-h-[100px]"
                              />
                            ) : (
                              <h2 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl">
                                {slide.title || slide.name}
                              </h2>
                            )}
                            <p className="flex max-w-md items-center justify-center gap-2 rounded-lg bg-black px-2 py-1 text-center text-sm text-white md:text-base">
                              <Star className="mr-1 size-5 fill-current text-yellow-500" />
                              {slide.vote_average || slide.score} (
                              {slide.vote_count || slide.scored_by})
                            </p>

                            <p className="line-clamp-2 max-w-md text-center text-sm text-white/90 md:text-base">
                              {slide.overview || slide.synopsis}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              {slide.genre_ids ? (
                                <>
                                  {slide.genre_ids.map((genres: number) => (
                                    <p className="flex max-w-md items-center justify-center gap-2 rounded-lg bg-black p-1 text-center text-sm uppercase text-white md:text-base">
                                      {
                                        genreMap[
                                          genres as keyof typeof genreMap
                                        ]
                                      }
                                    </p>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {slide.genres.map(
                                    (genre: { name: string }) => (
                                      <p className="flex max-w-md items-center justify-center gap-2 rounded-lg bg-black p-1 text-center text-sm uppercase text-white md:text-base">
                                        {genre.name}
                                      </p>
                                    )
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-end gap-4 px-10">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type Prop = {
  children?: any
  onClick?: () => void
  disabled?: boolean
}
const PrevButton: React.FC<Prop> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="flex size-[40px] items-center justify-center rounded-full border"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  )
}

export const NextButton: React.FC<Prop> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="flex size-[40px] items-center justify-center rounded-full border"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  )
}
