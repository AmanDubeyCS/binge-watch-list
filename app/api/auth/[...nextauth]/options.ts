import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "emailSignIn",
      name: "EmailSignIn",
      credentials: {
        uuid: {
          label: "Token",
          type: "password",
          placeholder: "Enter id Token",
        },
        name: { lable: "Name", type: "text" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const { uuid, name, email } = credentials as {
          uuid: string
          name: string
          email: string
        }

        try {
          return {
            id: uuid,
            email: email,
            name: name,
            // image: photoURL,
          }
        } catch (error: any) {
          console.error("Error registering user:", error.message)
          throw new Error(error.message || "Registration failed")
        }
      },
    }),
    // Google Login using Popup
    CredentialsProvider({
      id: "signinwithgoogle",
      name: "Signinwithgoogle",
      credentials: {
        uuid: {
          label: "Token",
          type: "password",
          placeholder: "Enter id Token",
        },
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        name: { label: "Name", type: "text", placeholder: "Enter Name" },
        profile_pic_url: {
          label: "Profile Pic Url",
          type: "text",
          placeholder: "Enter Profile Pic Url",
        },
      },
      async authorize(credentials) {
        try {
          const { uuid, email, name, profile_pic_url } = credentials as {
            uuid: string
            email: string
            name: string
            profile_pic_url: string
          }

          return {
            id: uuid,
            email: email,
            name: name,
            image: profile_pic_url,
          }
        } catch (error) {
          console.error("Error with Google popup login:", error)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
      }
      return session
    },
  },
  pages: {
    signIn: "/signup",
  },
}

export default NextAuth(authOptions)
