"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useSession } from "next-auth/react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
interface UserProfile {
  name: string
  biography: string
  location: string
  profileImage: string
  bannerImage: string
  isPrivate: boolean
  gender: string
  birthday: string
}

interface EditProfileDialogProps {
  initialData: UserProfile
}

export function EditProfileDialog({ initialData }: EditProfileDialogProps) {
  const [formData, setFormData] = useState<UserProfile>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const profileImageRef = useRef<HTMLInputElement>(null)
  // const bannerImageRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const handleImageChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: "profileImage" | "bannerImage"
  // ) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({ ...prev, [field]: reader.result as string }))
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userId = session?.user?.id
    if (!userId) return

    const userDocRef = doc(db, "users", userId)

    try {
      await updateDoc(userDocRef, {
        name: formData.name,
        gender: formData.gender,
        birthday: formData.birthday,
        location: formData.location,
        biography: formData.biography,
        isPrivate: formData.isPrivate,
      })

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile.")
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <div onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
          <DialogTitle className="flex items-center rounded bg-white px-4 py-2 text-base font-bold text-black hover:bg-gray-200 md:ml-auto">
            Edit Profile
          </DialogTitle>
        </div>
        <DialogContent className="rounded-lg bg-white shadow-xl sm:max-w-[600px]">
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="space-y-6">
              {/* <div className="relative flex h-[250px] justify-center space-x-4">
              <div className="relative z-50 mt-auto">
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="size-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <div className="absolute size-full">
                <img
                  src={formData.bannerImage}
                  alt="Banner"
                  className="size-full rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => bannerImageRef.current?.click()}
                  className="absolute right-1 top-1 rounded-full bg-blue-500 p-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div> */}
              {/* <input
              type="file"
              ref={profileImageRef}
              onChange={(e) => handleImageChange(e, "profileImage")}
              className="hidden"
              accept="image/*"
            />
            <input
              type="file"
              ref={bannerImageRef}
              onChange={(e) => handleImageChange(e, "bannerImage")}
              className="hidden"
              accept="image/*"
            /> */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="biography"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <textarea
                  id="biography"
                  name="biography"
                  rows={3}
                  value={formData.biography}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPrivate: e.target.checked,
                    }))
                  }
                  className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="isPrivate"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Private Profile
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
