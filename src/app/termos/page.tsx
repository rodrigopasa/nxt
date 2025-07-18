import UnifiedSeo from '@/components/seo/unified-seo';

export default function TermosPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Termos de Uso" description="Leia os termos de uso do site." />
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
      <p className="text-gray-400">Ao utilizar este site, você concorda com os termos e condições descritos nesta página.</p>
    </div>
  );
} 