'use client'

import MainContext from "@/lib/main-context"
import { ReactNode, useContext, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { userDetails } = useContext(MainContext)

  useEffect(() => {
    if (!userDetails) {
      router.push("/auth/login")
    }
    setLoading(false)
  }, [router, userDetails])

  if (loading) {
    return <></>
  } else {
    return children
  }
}