import { Layout } from "@/components/Layout"
import dynamic from 'next/dynamic'
import ProtectedRoute from "@/components/protected-route"

const Index = dynamic(() => import('@/components/Index'), { ssr: false })

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <Index snippetId={''} />
      </Layout>
    </ProtectedRoute>
  )
}