import Link from 'next/link';
// ... outros imports necessários (adapte conforme necessário)

export default function PdfCard({ pdf }: { pdf: any }) {
  // Estrutura inicial SSR, sem hooks client-only
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden hover:border-primary transition h-[420px] flex flex-col">
      <Link href={`/pdf/${pdf.slug}`}>
        <div className="relative h-[220px] bg-dark-surface-2">
          {/* Imagem e ícone podem ser adaptados depois */}
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/pdf/${pdf.slug}`}>
          <h3 className="font-medium mb-2 line-clamp-2 hover:text-primary">{pdf.title}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{pdf.description || 'Sem descrição disponível.'}</p>
        {/* Outras informações podem ser migradas depois */}
      </div>
    </div>
  );
} 