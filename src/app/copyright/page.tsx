import UnifiedSeo from '@/components/seo/unified-seo';

export default function CopyrightPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Copyright" description="Informações sobre direitos autorais." />
      <h1 className="text-3xl font-bold mb-6">Copyright</h1>
      <p className="text-gray-400">Todo o conteúdo deste site é protegido por direitos autorais. Respeite as leis vigentes.</p>
    </div>
  );
} 