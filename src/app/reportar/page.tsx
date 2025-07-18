import UnifiedSeo from '@/components/seo/unified-seo';

export default function ReportarPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Reportar Problema" description="Reporte problemas ou conteúdos inadequados." />
      <h1 className="text-3xl font-bold mb-6">Reportar Problema</h1>
      <form className="max-w-lg mx-auto bg-dark-surface border border-dark-border rounded-lg p-8">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Descreva o problema</label>
          <textarea className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" rows={5} placeholder="Descreva o problema encontrado..." />
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Enviar</button>
      </form>
    </div>
  );
} 