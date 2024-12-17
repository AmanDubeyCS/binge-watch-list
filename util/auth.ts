import { db } from "@/app/firebaseConfig"
import { User } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export const saveUserData = async (user: User, name?: string) => {
  const userDoc = doc(db, "users", user.uid)
  await setDoc(userDoc, {
    email: user.email,
    name: user.displayName || name,
    profileImage:
      user.photoURL ||
      "https://image.tmdb.org/t/p/original/jexoNYnPd6vVrmygwF6QZmWPFdu.jpg",
    createdAt: new Date(),
    isPrivate: false,
    biography: "",
    location: "",
    bannerImage:
      "https://image.tmdb.org/t/p/original/tvaFREoQ7ssrPcwfz7Xbj2A7B2t.jpg",
    gender: "prefer not to say",
    birthday: "",
  })
}
