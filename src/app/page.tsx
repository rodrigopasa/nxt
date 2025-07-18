import Link from 'next/link';
import Sidebar from '@/components/layout/sidebar';
import PdfCard from '@/components/pdf/pdf-card';
import UnifiedSeo from '@/components/seo/unified-seo';

async function fetchPdfs(endpoint: string) {
  try {
    const res = await fetch(`${process.env.API_URL}${endpoint}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch {
    // Fallback para dados simulados
    if (endpoint.includes('popular')) {
      return [
        { id: 1, slug: 'exemplo-popular', title: 'PDF Popular 1', description: 'Descrição do PDF popular.' },
        { id: 2, slug: 'exemplo-popular-2', title: 'PDF Popular 2', description: 'Outro PDF popular.' },
      ];
    }
    if (endpoint.includes('recent')) {
      return [
        { id: 3, slug: 'exemplo-recente', title: 'PDF Recente 1', description: 'Descrição do PDF recente.' },
        { id: 4, slug: 'exemplo-recente-2', title: 'PDF Recente 2', description: 'Outro PDF recente.' },
      ];
    }
    return [];
  }
}

export default async function HomePage() {
  const popularPdfs = await fetchPdfs('/api/pdfs/popular');
  const recentPdfs = await fetchPdfs('/api/pdfs/recent');

  return (
    <div className="flex flex-1 overflow-hidden">
      <UnifiedSeo title="PDFxandria - Descubra e Baixe PDFs do Domínio Público" description="Explore nossa coleção de documentos PDF gratuitos e abertos para todos. Encontre livros, artigos e materiais educacionais disponíveis no domínio público." />
      <Sidebar className="hidden md:block" />
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-dark-surface via-dark-surface-2 to-dark-surface rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
                  <div className="bg-gradient-to-r from-purple-500 via-primary to-blue-500 bg-clip-text text-transparent text-sm font-semibold mb-2">
                    REPOSITÓRIO PÚBLICO DE PDFS
                  </div>
                  <h1 className="text-4xl font-bold mb-4">Descubra e Baixe PDFs do Domínio Público</h1>
                  <p className="text-gray-300 mb-6 text-lg">
                    Explore nossa coleção de documentos PDF gratuitos e abertos para todos. Encontre livros, artigos e materiais educacionais disponíveis no domínio público.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/explorar" className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded">
                      <span>Explorar Biblioteca</span>
                    </Link>
                    <Link href="/recentes" className="flex items-center space-x-2 border border-dark-border hover:bg-dark-surface-2 px-4 py-2 rounded">
                      <span>Recentes</span>
                    </Link>
                  </div>
                </div>
                {/* Imagem e elementos decorativos podem ser migrados depois */}
              </div>
            </div>
          </section>

          {/* PDFs Populares */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">PDFs Populares</h2>
              <Link href="/populares" className="text-primary hover:underline">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularPdfs.length > 0 ? (
                popularPdfs.map((pdf: any) => <PdfCard key={pdf.id} pdf={pdf} />)
              ) : (
                <div className="col-span-full h-64 flex items-center justify-center">
                  <p className="text-gray-400">Nenhum documento popular encontrado</p>
                </div>
              )}
            </div>
          </section>

          {/* Adicionados Recentemente */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Adicionados Recentemente</h2>
              <Link href="/recentes" className="text-primary hover:underline">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recentPdfs.length > 0 ? (
                recentPdfs.map((pdf: any) => <PdfCard key={pdf.id} pdf={pdf} />)
              ) : (
                <div className="col-span-full h-64 flex items-center justify-center">
                  <p className="text-gray-400">Nenhum documento recente encontrado</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
