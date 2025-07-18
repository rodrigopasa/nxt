import UnifiedSeo from '@/components/seo/unified-seo';

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="FAQ" description="Perguntas frequentes sobre o site." />
      <h1 className="text-3xl font-bold mb-6">Perguntas Frequentes (FAQ)</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Como faço para baixar um PDF?</h2>
        <p className="text-gray-400">Basta navegar até o PDF desejado e clicar no botão de download.</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Preciso de cadastro para baixar?</h2>
        <p className="text-gray-400">Não, o acesso é livre para todos os usuários.</p>
      </div>
    </div>
  );
} 