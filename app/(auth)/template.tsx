import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

interface AuthGroupTemplateProps {
  children: React.ReactNode
}
export default async function AuthGroupTemplate({
  children,
}: AuthGroupTemplateProps) {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/home")
  }
  return children
}
