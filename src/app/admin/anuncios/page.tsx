'use client';
import UnifiedSeo from '@/components/seo/unified-seo';
import { useState, useEffect } from 'react';

type Anuncio = { id: number; nome: string; status: string };

function SkeletonAnunciosTable() {
  return (
    <div className="w-full max-w-2xl bg-dark-surface border border-dark-border rounded-lg p-8 animate-pulse">
      <div className="h-6 bg-dark-surface-2 rounded w-1/2 mb-6" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-8 bg-dark-surface-2 rounded mb-4" />
      ))}
    </div>
  );
}

async function fetchAdminAnuncios() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/ads`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch (e) {
    return [
      { id: 1, nome: 'Banner Topo', status: 'ativo' },
      { id: 2, nome: 'Banner Lateral', status: 'inativo' },
      { error: true, message: (e as Error).message },
    ];
  }
}

export default function AdminAnunciosPage() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAdminAnuncios().then((data) => {
      setAnuncios(data);
      setLoading(false);
      const err = data.find((a: any) => a.error);
      if (err) setErro(err.message);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setErro('');
    // Exemplo: salvar novo anúncio (simulado)
    setSuccess(true);
  }

  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Admin - Anúncios" description="Gerencie os anúncios do site." />
      <h1 className="text-3xl font-bold mb-6">Anúncios</h1>
      {loading ? (
        <SkeletonAnunciosTable />
      ) : erro ? (
        <div className="mb-4 text-red-500">Erro ao buscar anúncios: {erro}</div>
      ) : (
        <>
          <form className="max-w-xl mb-8" onSubmit={handleSubmit}>
            {success && <div className="mb-4 text-green-500">Anúncio salvo com sucesso!</div>}
            <div className="flex gap-2">
              <input className="flex-1 p-2 rounded bg-dark-surface-2 border border-dark-border" type="text" placeholder="Novo anúncio (simulado)" />
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Adicionar</button>
            </div>
          </form>
          <table className="w-full max-w-2xl bg-dark-surface border border-dark-border rounded-lg">
            <thead>
              <tr className="text-left">
                <th className="p-3">Nome</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {anuncios.filter((a: any) => !a.error).map((a: any) => (
                <tr key={a.id} className="border-t border-dark-border">
                  <td className="p-3">{a.nome || a.name}</td>
                  <td className="p-3">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
} 