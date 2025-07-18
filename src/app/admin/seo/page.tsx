'use client';
import UnifiedSeo from '@/components/seo/unified-seo';
import { useState, useEffect } from 'react';

type SeoSettings = { siteTitle: string; siteDescription: string; error?: boolean; message?: string };

function SkeletonSeoForm() {
  return (
    <div className="max-w-xl bg-dark-surface border border-dark-border rounded-lg p-8 animate-pulse">
      <div className="h-6 bg-dark-surface-2 rounded w-1/2 mb-6" />
      <div className="h-4 bg-dark-surface-2 rounded w-1/3 mb-4" />
      <div className="h-10 bg-dark-surface-2 rounded mb-6" />
      <div className="h-4 bg-dark-surface-2 rounded w-1/3 mb-4" />
      <div className="h-20 bg-dark-surface-2 rounded mb-6" />
      <div className="h-10 bg-dark-surface-2 rounded w-1/4" />
    </div>
  );
}

async function fetchAdminSeo(): Promise<SeoSettings> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/seo-settings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch (e) {
    return { siteTitle: '', siteDescription: '', error: true, message: (e as Error).message };
  }
}

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAdminSeo().then((data) => {
      setSeo(data);
      setLoading(false);
      if (data.error) setErro(data.message || 'Erro desconhecido');
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setErro('');
    const form = e.target as HTMLFormElement;
    const siteTitle = (form.elements.namedItem('siteTitle') as HTMLInputElement).value;
    const siteDescription = (form.elements.namedItem('siteDescription') as HTMLInputElement).value;
    try {
      const res = await fetch(`${process.env.API_URL}/api/seo-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteTitle, siteDescription }),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      setSuccess(true);
    } catch (e) {
      setErro('Erro ao salvar configurações');
    }
  }

  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Admin - SEO" description="Gerencie as configurações de SEO do site." />
      <h1 className="text-3xl font-bold mb-6">Configurações de SEO</h1>
      {loading ? (
        <SkeletonSeoForm />
      ) : erro ? (
        <div className="mb-4 text-red-500">Erro ao buscar configurações de SEO: {erro}</div>
      ) : (
        <form className="max-w-xl bg-dark-surface border border-dark-border rounded-lg p-8" onSubmit={handleSubmit}>
          {success && <div className="mb-4 text-green-500">Configurações salvas com sucesso!</div>}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Título do Site</label>
            <input name="siteTitle" className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" type="text" defaultValue={seo?.siteTitle} placeholder="Título do site" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Descrição</label>
            <textarea name="siteDescription" className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" rows={3} defaultValue={seo?.siteDescription} placeholder="Descrição do site" />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Salvar</button>
        </form>
      )}
    </div>
  );
} 