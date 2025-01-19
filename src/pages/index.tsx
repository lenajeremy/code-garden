import { Layout } from "@/components/Layout";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ProtectedRoute from "@/components/protected-route";

const Index = dynamic(() => import('@/components/Index'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const snippetId = router.query['snippet-id'] as string;

  return (
    <ProtectedRoute>
      <Layout>
        <Index snippetId={snippetId} />
      </Layout>
    </ProtectedRoute>
  );
}