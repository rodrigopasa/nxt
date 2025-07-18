import UnifiedSeo from '@/components/seo/unified-seo';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="container mx-auto py-24 text-center">
      <UnifiedSeo title="Página não encontrada" description="A página que você procura não existe." />
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <p className="text-gray-400 mb-6">A página que você procura não foi encontrada.</p>
      <Link href="/" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Voltar para a Home</Link>
    </div>
  );
} 