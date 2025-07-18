import UnifiedSeo from '@/components/seo/unified-seo';

export default function PerfilPage() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Meu Perfil" description="Gerencie suas informações de perfil." />
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
      <div className="bg-dark-surface border border-dark-border rounded-lg p-8">
        <p className="text-gray-400">Aqui você poderá editar suas informações de perfil em breve.</p>
      </div>
    </div>
  );
} 