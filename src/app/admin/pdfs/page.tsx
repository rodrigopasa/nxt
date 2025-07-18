import UnifiedSeo from '@/components/seo/unified-seo';
import { Suspense } from 'react';

type Pdf = { id: number; title: string; status: string };
type PdfError = { error: boolean; message: string };

async function fetchAdminPdfs() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/pdfs`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch (e) {
    // Fallback para dados simulados
    return [
      { id: 1, title: 'PDF Popular 1', status: 'aprovado' },
      { id: 2, title: 'PDF Recente 1', status: 'pendente' },
      { error: true, message: (e as Error).message },
    ];
  }
}

function Loading() {
  return <div className="py-12 text-center text-gray-400">Carregando PDFs...</div>;
}

export default async function AdminPdfsPage() {
  const pdfs = await fetchAdminPdfs() as (Pdf | PdfError)[];
  const erro = pdfs.find((p): p is PdfError => 'error' in p && p.error);
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Admin - PDFs" description="Gerencie os PDFs do site." />
      <h1 className="text-3xl font-bold mb-6">PDFs</h1>
      <Suspense fallback={<Loading />}> {/* SSR Suspense para futuras melhorias */}
        {erro ? (
          <div className="mb-4 text-red-500">Erro ao buscar PDFs: {erro.message}</div>
        ) : null}
        <table className="w-full bg-dark-surface border border-dark-border rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="p-3">Título</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pdfs.filter((p): p is Pdf => !('error' in p)).map((pdf) => (
              <tr key={pdf.id} className="border-t border-dark-border">
                <td className="p-3">{pdf.title}</td>
                <td className="p-3">{pdf.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
} 