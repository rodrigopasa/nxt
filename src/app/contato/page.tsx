import UnifiedSeo from '@/components/seo/unified-seo';

export default function ContatoPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Contato" description="Entre em contato com a equipe do site." />
      <h1 className="text-3xl font-bold mb-6">Contato</h1>
      <form className="max-w-lg mx-auto bg-dark-surface border border-dark-border rounded-lg p-8">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Seu nome</label>
          <input className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" type="text" placeholder="Nome" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Seu e-mail</label>
          <input className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" type="email" placeholder="E-mail" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Mensagem</label>
          <textarea className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" rows={5} placeholder="Digite sua mensagem..." />
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Enviar</button>
      </form>
    </div>
  );
} 