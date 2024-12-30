"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/firebaseConfig"
import { GoogleSignIn } from "@/components/auth/GoogleSignIn"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const loginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
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
          router.replace("/home")
        } else if (result && result.status === 401) {
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Register
          </h2>

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

      <div>
        <section id="get_started" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-heading mb-4 text-3xl font-bold lg:text-4xl">
                Start Your Entertainment Journey
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Create your account and join the community of entertainment
                enthusiasts
              </p>
            </div>

            {/* <!-- Sign Up Form --> */}
            <div className="mx-auto max-w-md">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
                <div className="space-y-6">
                  {/* <!-- Email Input --> */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:ring-2"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* <!-- Password Input --> */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-200 px-4 py-3 transition-colors focus:ring-2"
                      placeholder="Create a password"
                    />
                  </div>

                  {/* <!-- Sign Up Button --> */}
                  <button className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg px-6 py-3 text-white transition-colors">
                    Create Account
                  </button>

                  {/* <!-- Terms --> */}
                  <p className="text-center text-sm text-gray-500">
                    By signing up, you agree to our
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Terms of Service
                    </a>
                    and
                    <a
                      href="#"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* <!-- Quick Features --> */}
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="bg-primary-50 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                    <i className="fas fa-rocket text-primary-600 text-xl"></i>
                  </div>
                  <h3 className="mb-2 font-semibold">Quick Setup</h3>
                  <p className="text-sm text-gray-600">
                    Start tracking in minutes
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                    <i className="fas fa-shield-alt text-primary-600 text-xl"></i>
                  </div>
                  <h3 className="mb-2 font-semibold">Secure</h3>
                  <p className="text-sm text-gray-600">
                    Your data is protected
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                    <i className="fas fa-sync text-primary-600 text-xl"></i>
                  </div>
                  <h3 className="mb-2 font-semibold">Always Updated</h3>
                  <p className="text-sm text-gray-600">Latest content info</p>
                </div>
              </div>

              {/* <!-- FAQ --> */}
              <div className="mt-16">
                <h3 className="mb-8 text-center text-xl font-semibold">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">Is it free to use?</h4>
                    <p className="text-sm text-gray-600">
                      Yes, BingeList is completely free to use with all core
                      features included.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">
                      Can I import my existing lists?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Yes, you can import your lists from other popular tracking
                      platforms.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">
                      How do I track my progress?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Simply add content to your list and update your progress
                      as you watch or read.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
