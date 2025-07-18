import UnifiedSeo from '@/components/seo/unified-seo';

export default function AjudaPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Ajuda" description="Perguntas frequentes e suporte ao usuário." />
      <h1 className="text-3xl font-bold mb-6">Ajuda</h1>
      <p className="text-gray-400 mb-4">Aqui você encontra respostas para dúvidas frequentes e orientações sobre o uso do site.</p>
      <ul className="list-disc pl-6 text-gray-300">
        <li>Como baixar um PDF?</li>
        <li>Como reportar um problema?</li>
        <li>Como sugerir novos documentos?</li>
      </ul>
    </div>
  );
} 