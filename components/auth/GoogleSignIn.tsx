import React from "react"
import { auth } from "@/app/firebaseConfig"
import { saveUserData } from "@/util/auth"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
          router.replace("/home")
        } else if (result && result.status === 401) {
          console.log("error")
        }
      }
      toast.success("Welcome", { description: "Sign-In sucsessfully" })
    } catch (error) {
      toast.error("Error:", {
        description: "failed to Sign-In, please try again",
      })
    }
  }
  return (
    <button
      onClick={signInWithGoogle}
      className="flex w-full items-center justify-center rounded-lg border border-gray-300 py-2 transition hover:bg-gray-50"
    >
      <img
        src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
        alt="Google"
        className="mr-2 size-5"
      />
      Sign in with Google
    </button>
  )
}
