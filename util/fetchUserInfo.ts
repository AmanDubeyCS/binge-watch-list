import { db } from "@/app/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"

export const fetchUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId))
    if (userDoc.exists()) {
      return userDoc.data()
    } else {
      console.error("No such user!")
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
  }
}
