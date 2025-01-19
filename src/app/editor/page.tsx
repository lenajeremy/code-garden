"use client"

import { Layout } from "@/components/Layout"
import ProtectedRoute from "@/components/protected-route"
import Index from "@/components/Index"

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <Index snippetId={''} />
      </Layout>
    </ProtectedRoute>
  )
}