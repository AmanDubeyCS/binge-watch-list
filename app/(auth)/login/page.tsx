"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/firebaseConfig"
import { GoogleSignIn } from "@/components/auth/GoogleSignIn"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const loginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const user = result.user
      if (user) {
        const result = await signIn("emailSignIn", {
          callbackUrl: "/",
          redirect: false,
          uuid: user.uid,
          email: user.email,
          name: user.displayName,
        })
        if (result && result.status === 200) {
          setIsLoading(false)
          router.replace("/home")
        } else if (result && result.status === 401) {
          setIsLoading(false)
          console.log("error")
        }
      }
      console.log("Email Login Successful:", user)
    } catch (error) {
      console.error("Login Error:", error)
    }
  }

  return (
    <>
      {isLoading && <div className="size-full">please wait...</div>}
      <div className="flex h-[calc(100vh-89px)] items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Login
          </h2>

          <div className="space-y-6">
            <form onSubmit={loginWithEmail} className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {/* Register Button */}
              <button
                type="submit"
                className="hover:bg-primary-700 w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="font-bold text-blue-800">
                Sign Up
              </Link>
            </p>

            {/* <!-- Sign Up Button --> */}

            <div className="my-4 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <GoogleSignIn />
          </div>
        </div>
      </div>
    </>
  )
}
