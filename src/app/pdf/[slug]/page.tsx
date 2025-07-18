import UnifiedSeo from '@/components/seo/unified-seo';
import PdfCard from '@/components/pdf/pdf-card';
import Link from 'next/link';

interface Pdf {
  id: number;
  slug: string;
  title: string;
  description: string;
  // ...outros campos necessários
}

// Função para buscar dados do PDF pelo slug (substitua por fetch real)
async function getPdfBySlug(slug: string): Promise<Pdf | null> {
  // Exemplo de fetch real:
  // const res = await fetch(`https://seusite.com/api/pdfs/${slug}`);
  // if (!res.ok) return null;
  // return await res.json();
  if (slug === 'exemplo-popular') {
    return { id: 1, slug, title: 'PDF Popular 1', description: 'Descrição do PDF popular.' };
  }
  return null;
}

type PdfPageProps = { params: { slug: string } };

export default async function PdfDetailPage({ params }: PdfPageProps) {
  const pdf = await getPdfBySlug(params.slug);
  if (!pdf) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-2xl font-bold mb-4">PDF não encontrado</h1>
        <Link href="/" className="text-primary hover:underline">Voltar para a Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title={pdf.title} description={pdf.description} />
      <h1 className="text-3xl font-bold mb-4">{pdf.title}</h1>
      <p className="text-gray-400 mb-6">{pdf.description}</p>
      {/* Placeholder para visualização do PDF */}
      <div className="bg-dark-surface border border-dark-border rounded-lg p-8 text-center text-gray-500">
        Visualização do PDF aqui (em breve)
      </div>
      {/* Outras informações e ações podem ser adicionadas depois */}
    </div>
  );
} 