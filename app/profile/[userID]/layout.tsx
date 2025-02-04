import { ProfileImage } from "@/components/profile/ProfileImage"
import { ProfileNav } from "@/components/profile/ProfileNav"
import { ProfileSettings } from "@/components/ProfileSettings"
import { fetchUserData } from "@/util/fetchUserInfo"
import { Timestamp } from "firebase/firestore"
import { Calendar, MapPin, Lock } from "lucide-react"
import Image from "next/image"
import React, { ReactElement } from "react"

interface UserProfile {
  name: string
  biography: string
  location: string
  profileImage: string
  bannerImage: string
  gender: string
  birthday: string
  isPrivate: boolean
  createdAt: { seconds: number }
}

const convertTimestampToDate = (seconds: number) => {
  const date = new Date(seconds * 1000)

  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })

  return formattedDate
}

function serializeFirestoreData(data: any) {
  return {
    ...data,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : null,
  }
}

export default async function Layout({
  params,
  children,
}: {
  params: { userID: string }
  children: ReactElement
}) {
  const userId = params.userID
  const userData = (await fetchUserData(userId)) as UserProfile
  const serializedData = serializeFirestoreData(userData)

  if (!userData) {
    return
  }

  return (
    <div>
      <header className="relative h-[400px] overflow-hidden bg-gray-100 md:h-[500px]">
        <Image
          src={userData.bannerImage}
          alt="Profile Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-8">
          <div className="relative z-10 flex flex-col items-center space-y-4 md:flex-row md:items-end md:space-x-6 md:space-y-0">
            <ProfileImage image={userData.profileImage} userID={userId} />
            {/* <div className="relative size-32 overflow-hidden rounded-full border-4 border-white md:size-40">
              <Image
                src={userData.profileImage}
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div> */}
            <div className="text-center text-white md:text-left">
              <h1 className="text-3xl font-bold md:text-4xl">
                {userData.name}
              </h1>
              {userData.biography ? (
                <p className="mt-2 max-w-lg text-gray-200">
                  {userData.biography}
                </p>
              ) : (
                <p className="mt-2 line-clamp-2 max-w-lg text-gray-200">
                  Passionate entertainment enthusiast. Always on the lookout for
                  the next big thing in manga, anime, TV shows, movies, and
                  games! Passionate entertainment enthusiast. Always on the
                  lookout for the next big thing in manga, anime, TV shows,
                  movies, and games!
                </p>
              )}
              <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                {userData.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="size-5" />
                    <span>{userData.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="size-5" />
                  <span>
                    Joined {convertTimestampToDate(userData.createdAt.seconds)}
                  </span>
                </div>
              </div>
            </div>
            <ProfileSettings serializedData={serializedData} userId={userId} />
          </div>
        </div>
      </header>
      {!userData.isPrivate ? (
        <>
          <ProfileNav userId={userId} />
          <div className="mx-auto max-w-[1600px] px-2 lg:px-4 lg:py-10">
            {children}
          </div>
        </>
      ) : (
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-center px-2 lg:px-4 lg:py-10">
          <div>
            <p className="text-[32px] font-bold">Private Profile</p>
          </div>
          <Lock size={200} />
        </div>
      )}
    </div>
  )
}
