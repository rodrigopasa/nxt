import UnifiedSeo from '@/components/seo/unified-seo';
import PdfCard from '@/components/pdf/pdf-card';

const favoritos = [
  { id: 1, slug: 'exemplo-popular', title: 'PDF Popular 1', description: 'Descrição do PDF popular.' },
];

export default function FavoritosPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Favoritos" description="Seus PDFs favoritos salvos no site." />
      <h1 className="text-3xl font-bold mb-6">Meus Favoritos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favoritos.length > 0 ? (
          favoritos.map((pdf) => <PdfCard key={pdf.id} pdf={pdf} />)
        ) : (
          <div className="col-span-full h-64 flex items-center justify-center">
            <p className="text-gray-400">Nenhum PDF favorito encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
} 