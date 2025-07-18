'use client';
import UnifiedSeo from '@/components/seo/unified-seo';
import { useState, useEffect } from 'react';

function SkeletonConfigForm() {
  return (
    <div className="max-w-xl bg-dark-surface border border-dark-border rounded-lg p-8 animate-pulse">
      <div className="h-6 bg-dark-surface-2 rounded w-1/2 mb-6" />
      <div className="h-4 bg-dark-surface-2 rounded w-1/3 mb-4" />
      <div className="h-10 bg-dark-surface-2 rounded mb-6" />
      <div className="h-10 bg-dark-surface-2 rounded w-1/4" />
    </div>
  );
}

async function fetchAdminConfigs() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/site-settings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch (e) {
    return { maintenance: false, error: true, message: (e as Error).message };
  }
}

export default function AdminConfiguracoesPage() {
  const [configs, setConfigs] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAdminConfigs().then((data) => {
      setConfigs(data);
      setLoading(false);
      if (data.error) setErro(data.message);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(false);
    setErro('');
    const form = e.target as HTMLFormElement;
    const maintenance = (form.elements.namedItem('maintenance') as HTMLSelectElement).value === 'on';
    try {
      const res = await fetch(`${process.env.API_URL}/api/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenance }),
      });
      if (!res.ok) throw new Error('Erro ao salvar');
      setSuccess(true);
    } catch (e) {
      setErro('Erro ao salvar configurações');
    }
  }

  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Admin - Configurações" description="Configurações gerais do site." />
      <h1 className="text-3xl font-bold mb-6">Configurações Gerais</h1>
      {loading ? (
        <SkeletonConfigForm />
      ) : erro ? (
        <div className="mb-4 text-red-500">Erro ao buscar configurações: {erro}</div>
      ) : (
        <form className="max-w-xl bg-dark-surface border border-dark-border rounded-lg p-8" onSubmit={handleSubmit}>
          {success && <div className="mb-4 text-green-500">Configurações salvas com sucesso!</div>}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Modo manutenção</label>
            <select name="maintenance" className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border" defaultValue={configs.maintenance ? 'on' : 'off'}>
              <option value="off">Desligado</option>
              <option value="on">Ligado</option>
            </select>
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Salvar</button>
        </form>
      )}
    </div>
  );
} 