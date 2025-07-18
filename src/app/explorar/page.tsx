import UnifiedSeo from '@/components/seo/unified-seo';
import PdfCard from '@/components/pdf/pdf-card';

const pdfs = [
  { id: 1, slug: 'exemplo-popular', title: 'PDF Popular 1', description: 'Descrição do PDF popular.' },
  { id: 2, slug: 'exemplo-popular-2', title: 'PDF Popular 2', description: 'Outro PDF popular.' },
  { id: 3, slug: 'exemplo-recente', title: 'PDF Recente 1', description: 'Descrição do PDF recente.' },
];

export default function ExplorarPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Explorar PDFs" description="Explore todos os PDFs disponíveis no repositório." />
      <h1 className="text-3xl font-bold mb-6">Explorar PDFs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {pdfs.map((pdf) => <PdfCard key={pdf.id} pdf={pdf} />)}
      </div>
    </div>
  );
} 