import React from "react"
import { auth } from "@/app/firebaseConfig"
import { saveUserData } from "@/util/auth"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function GoogleSignIn() {
  const router = useRouter()
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      saveUserData(user)
      if (user) {
        const result = await signIn("signinwithgoogle", {
          callbackUrl: "/",
          redirect: false,
          uuid: user.uid,
          email: user.email,
          name: user.displayName,
          profile_pic_url: user.photoURL,
        })
        if (result && result.status === 200) {
          router.replace("/profile")
        } else if (result && result.status === 401) {
          console.log("error")
        }
      }
      console.log("Google Sign-In Successful:", user)
    } catch (error) {
      console.error("Google Sign-In Error:", error)
    }
  }
  return (
    <button
      onClick={signInWithGoogle}
      className="flex w-full items-center justify-center rounded-lg border border-gray-300 py-2 transition hover:bg-gray-50"
    >
      <img
        src="https://commons.wikimedia.org/wiki/Category:Google_SVG_logos#/media/File:Google_%22G%22_logo.svg"
        alt="Google"
        className="mr-2 size-5"
      />
      Sign in with Google
    </button>
  )
}
