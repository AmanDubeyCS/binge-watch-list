"use client"
import { auth } from "@/app/firebaseConfig"
import { GoogleSignIn } from "@/components/auth/GoogleSignIn"
import { saveUserData } from "@/util/auth"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user
      saveUserData(user, name)
      if (user) {
        const result = await signIn("emailSignIn", {
          callbackUrl: "/",
          redirect: false,
          uuid: user.uid,
          email: user.email,
          name: name,
        })
        if (result && result.status === 200) {
          router.replace("/home")
        } else if (result && result.status === 401) {
          console.log("error")
        }
      }
      console.log("Email Sign-Up Successful:", user)
    } catch (error) {
      console.error("Sign-Up Error:", error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register
        </h2>

        <form onSubmit={signUpWithEmail} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <GoogleSignIn />
      </div>
    </div>
    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={handleRegister}>
    //   <div>
    //       <label>Name</label>
    //       <input
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //     <button type="submit">Register</button>
    //   </form>
    // </div>
  )
}
