import UnifiedSeo from '@/components/seo/unified-seo';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Painel Admin" description="Painel administrativo do site." />
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/seo" className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
          <h2 className="text-xl font-semibold mb-2">SEO</h2>
          <p className="text-gray-400">Gerencie as configurações de SEO do site</p>
        </Link>
        <Link href="/admin/usuarios" className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
          <h2 className="text-xl font-semibold mb-2">Usuários</h2>
          <p className="text-gray-400">Gerencie usuários e permissões</p>
        </Link>
        <Link href="/admin/pdfs" className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
          <h2 className="text-xl font-semibold mb-2">PDFs</h2>
          <p className="text-gray-400">Gerencie documentos PDF</p>
        </Link>
        <Link href="/admin/categorias" className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
          <h2 className="text-xl font-semibold mb-2">Categorias</h2>
          <p className="text-gray-400">Gerencie categorias do site</p>
        </Link>
        <Link href="/admin/anuncios" className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
          <h2 className="text-xl font-semibold mb-2">Anúncios</h2>
          <p className="text-gray-400">Gerencie anúncios e banners</p>
        </Link>
        <Link href="/admin/configuracoes" className="block bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary transition">
          <h2 className="text-xl font-semibold mb-2">Configurações</h2>
          <p className="text-gray-400">Configurações gerais do site</p>
        </Link>
      </div>
    </div>
  );
} 