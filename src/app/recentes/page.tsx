import UnifiedSeo from '@/components/seo/unified-seo';
import PdfCard from '@/components/pdf/pdf-card';

const recentPdfs = [
  { id: 3, slug: 'exemplo-recente', title: 'PDF Recente 1', description: 'Descrição do PDF recente.' },
  { id: 4, slug: 'exemplo-recente-2', title: 'PDF Recente 2', description: 'Outro PDF recente.' },
];

export default function RecentesPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="PDFs Recentes" description="Veja os PDFs adicionados recentemente ao repositório." />
      <h1 className="text-3xl font-bold mb-6">Adicionados Recentemente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recentPdfs.map((pdf) => <PdfCard key={pdf.id} pdf={pdf} />)}
      </div>
    </div>
  );
} 