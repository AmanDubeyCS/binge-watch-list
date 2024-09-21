import { Anime } from "@/types/anime/singleAnime"
import { Calendar, Clock, Heart, Link, Users } from "lucide-react"
import React from "react"

export default function Overview({ animeInfo }: { animeInfo: Anime }) {
  return (
    <div className="space-y-6 text-black md:col-span-2">
      {animeInfo.trailer.embed_url && (
        <section className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={animeInfo.trailer.embed_url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video size-full rounded-lg"
            ></iframe>
          </div>
        </section>
      )}

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Anime Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Calendar className="mr-2 size-5 text-blue-500" />
            <span className="font-semibold">Aired:</span>
            <span className="ml-2">{animeInfo.aired.string}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 size-5 text-blue-500" />
            <span className="font-semibold">Duration:</span>
            <span className="ml-2">{animeInfo.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 size-5 text-blue-500" />
            <span className="font-semibold">Members:</span>
            <span className="ml-2">{animeInfo.members}</span>
          </div>
          <div className="flex items-center">
            <Heart className="mr-2 size-5 text-blue-500" />
            <span className="font-semibold">Favorites:</span>
            <span className="ml-2">{animeInfo.favorites}</span>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">
          Genres, Themes & Demographics
        </h2>
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-semibold">Genres:</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {animeInfo.genres.map((genre, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Themes:</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {animeInfo.themes.map((theme, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-800"
                >
                  {theme.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Demographics:</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {animeInfo.demographics.map((demo, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-2 py-1 text-sm text-purple-800"
                >
                  {demo.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Related Anime & Manga</h2>
        {animeInfo.relations.map((relation, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{relation.relation}</h3>
            {relation.entry.map((entry, entryIndex) => (
              <div key={entryIndex} className="mt-1 flex items-center">
                <Link className="mr-2 size-4 text-blue-500" />
                <a href={entry.url} className="text-blue-500 hover:underline">
                  {entry.name}
                </a>
                <span className="ml-2 text-gray-600">({entry.type})</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Broadcast Information</h2>
        <p className="text-gray-700">
          <span className="font-semibold">Broadcast:</span>{" "}
          {animeInfo.broadcast.string}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Season:</span> {animeInfo.season}
        </p>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Theme Songs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Opening Theme:</h3>
            {animeInfo.theme.openings.map((theam, index) => (
              <p key={index} className="text-gray-700">
                {theam}
              </p>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ending Themes:</h3>
            {animeInfo.theme.endings.map((theam, index) => (
              <p key={index} className="text-gray-700">
                {theam}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
