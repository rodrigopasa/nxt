import UnifiedSeo from '@/components/seo/unified-seo';
import Link from 'next/link';

const categories = [
  { id: 1, slug: 'educacao', name: 'Educação' },
  { id: 2, slug: 'negocios', name: 'Negócios' },
  { id: 3, slug: 'ciencia', name: 'Ciência' },
];

export default function CategoriasPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Categorias" description="Navegue pelas categorias de PDFs disponíveis." />
      <h1 className="text-3xl font-bold mb-6">Categorias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categoria/${cat.slug}`} className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
            <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-gray-400">PDFs da categoria {cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 