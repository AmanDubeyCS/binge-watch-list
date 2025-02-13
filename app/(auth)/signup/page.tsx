"use client"
import { auth } from "@/app/firebaseConfig"
import { GoogleSignIn } from "@/components/auth/GoogleSignIn"
import { saveUserData } from "@/util/auth"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { RefreshCw, Rocket, Shield } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
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
    <>
      <div>
        <section id="get_started" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
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
                      className="hover:bg-primary-700 w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors"
                    >
                      Create Account
                    </button>
                  </form>
                  <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href={"/login"} className="font-bold text-blue-800">
                      Login
                    </Link>
                  </p>
                  {/* <!-- Sign Up Button --> */}

                  <div className="my-4 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="w-full border-t border-gray-300"></div>
                  </div>

                  <GoogleSignIn />

                  {/* <!-- Terms --> */}
                  <p className="flex flex-wrap justify-center gap-1 text-center text-sm text-gray-500">
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
                    <Rocket size={40} />
                  </div>
                  <h3 className="mb-2 font-semibold">Quick Setup</h3>
                  <p className="text-sm text-gray-600">
                    Start tracking in minutes
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                    <Shield size={40} />
                  </div>
                  <h3 className="mb-2 font-semibold">Secure</h3>
                  <p className="text-sm text-gray-600">
                    Your data is protected
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
                    <RefreshCw size={40} />
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
                      Yes, My Binge List is completely free to use with all core
                      features included.
                    </p>
                  </div>
                  {/* <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">
                      Can I import my existing lists?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Yes, you can import your lists from other popular tracking
                      platforms.
                    </p>
                  </div> */}
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
