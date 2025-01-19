"use client"

import { Layout } from "@/components/Layout"
import ProtectedRoute from "@/components/protected-route"
import Index from "@/components/Index"

export default function SnippetPage({
  params,
}: {
  params: { 'snippet-id': string }
}) {
  return (
    <ProtectedRoute>
      <Layout>
        <Index snippetId={params['snippet-id']} />
      </Layout>
    </ProtectedRoute>
  )
}