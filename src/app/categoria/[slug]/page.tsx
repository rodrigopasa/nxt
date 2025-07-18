import UnifiedSeo from '@/components/seo/unified-seo';
import PdfCard from '@/components/pdf/pdf-card';

const allPdfs = [
  { id: 1, slug: 'exemplo-popular', title: 'PDF Popular 1', description: 'Descrição do PDF popular.', category: 'educacao' },
  { id: 2, slug: 'exemplo-popular-2', title: 'PDF Popular 2', description: 'Outro PDF popular.', category: 'negocios' },
  { id: 3, slug: 'exemplo-recente', title: 'PDF Recente 1', description: 'Descrição do PDF recente.', category: 'educacao' },
];

export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const pdfs = allPdfs.filter((pdf) => pdf.category === params.slug);
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title={`Categoria: ${categoryName}`} description={`PDFs da categoria ${categoryName}.`} />
      <h1 className="text-3xl font-bold mb-6">Categoria: {categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => <PdfCard key={pdf.id} pdf={pdf} />)
        ) : (
          <div className="col-span-full h-64 flex items-center justify-center">
            <p className="text-gray-400">Nenhum PDF encontrado nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
} 