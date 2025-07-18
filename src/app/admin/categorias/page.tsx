'use client';
import UnifiedSeo from '@/components/seo/unified-seo';
import { useState, useEffect } from 'react';

type Categoria = { id: number; nome: string };

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      role="alert" aria-live="assertive">
      {message}
      <button onClick={onClose} className="ml-4 text-white font-bold" aria-label="Fechar">×</button>
    </div>
  );
}

function SkeletonCategoriasTable() {
  return (
    <div className="w-full max-w-2xl bg-dark-surface border border-dark-border rounded-lg p-8 animate-pulse">
      <div className="h-6 bg-dark-surface-2 rounded w-1/2 mb-6" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-8 bg-dark-surface-2 rounded mb-4" />
      ))}
    </div>
  );
}

async function fetchAdminCategorias() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch (e) {
    return [
      { id: 1, nome: 'Educação' },
      { id: 2, nome: 'Negócios' },
      { error: true, message: (e as Error).message },
    ];
  }
}

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState('');
  const [removerId, setRemoverId] = useState<number | null>(null);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function carregarCategorias() {
    setLoading(true);
    setErro('');
    const data = await fetchAdminCategorias();
    setCategorias(data.filter((c: any) => !c.error));
    const err = data.find((c: any) => c.error);
    if (err) setErro(err.message);
    setLoading(false);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!novaCategoria.trim()) return;
    try {
      const res = await fetch(`${process.env.API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novaCategoria }),
      });
      if (!res.ok) throw new Error('Erro ao adicionar categoria');
      showToast('Categoria adicionada com sucesso!', 'success');
      setNovaCategoria('');
      carregarCategorias();
    } catch {
      showToast('Erro ao adicionar categoria', 'error');
    }
  }

  async function handleEdit(id: number) {
    if (!editNome.trim()) return;
    try {
      const res = await fetch(`${process.env.API_URL}/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: editNome }),
      });
      if (!res.ok) throw new Error('Erro ao editar categoria');
      showToast('Categoria editada com sucesso!', 'success');
      setEditId(null);
      setEditNome('');
      carregarCategorias();
    } catch {
      showToast('Erro ao editar categoria', 'error');
    }
  }

  async function handleRemove(id: number) {
    try {
      const res = await fetch(`${process.env.API_URL}/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao remover categoria');
      showToast('Categoria removida com sucesso!', 'success');
      setRemoverId(null);
      carregarCategorias();
    } catch {
      showToast('Erro ao remover categoria', 'error');
    }
  }

  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Admin - Categorias" description="Gerencie as categorias do site." />
      <h1 className="text-3xl font-bold mb-6">Categorias</h1>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {loading ? (
        <SkeletonCategoriasTable />
      ) : erro ? (
        <div className="mb-4 text-red-500">Erro ao buscar categorias: {erro}</div>
      ) : (
        <>
          <form className="max-w-xl mb-8" onSubmit={handleAdd} aria-label="Adicionar categoria">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 rounded bg-dark-surface-2 border border-dark-border"
                type="text"
                placeholder="Nova categoria"
                value={novaCategoria}
                onChange={e => setNovaCategoria(e.target.value)}
                aria-label="Nova categoria"
              />
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark" aria-label="Adicionar">Adicionar</button>
            </div>
          </form>
          <table className="w-full max-w-2xl bg-dark-surface border border-dark-border rounded-lg">
            <thead>
              <tr className="text-left">
                <th className="p-3">Nome</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat: Categoria) => (
                <tr key={cat.id} className="border-t border-dark-border">
                  <td className="p-3">
                    {editId === cat.id ? (
                      <input
                        className="p-2 rounded bg-dark-surface-2 border border-dark-border"
                        value={editNome}
                        onChange={e => setEditNome(e.target.value)}
                        aria-label="Editar nome da categoria"
                        autoFocus
                      />
                    ) : (
                      cat.nome
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    {editId === cat.id ? (
                      <>
                        <button onClick={() => handleEdit(cat.id)} className="bg-green-600 text-white px-3 py-1 rounded" aria-label="Salvar edição">Salvar</button>
                        <button onClick={() => { setEditId(null); setEditNome(''); }} className="bg-gray-500 text-white px-3 py-1 rounded" aria-label="Cancelar edição">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditId(cat.id); setEditNome(cat.nome); }} className="bg-blue-600 text-white px-3 py-1 rounded" aria-label="Editar">Editar</button>
                        <button onClick={() => setRemoverId(cat.id)} className="bg-red-600 text-white px-3 py-1 rounded" aria-label="Remover">Remover</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Modal de confirmação para remoção */}
          {removerId && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-dark-surface border border-dark-border rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Confirmar remoção</h2>
                <p className="mb-6">Tem certeza que deseja remover esta categoria?</p>
                <div className="flex gap-4 justify-end">
                  <button onClick={() => setRemoverId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
                  <button onClick={() => handleRemove(removerId)} className="bg-red-600 text-white px-4 py-2 rounded">Remover</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 