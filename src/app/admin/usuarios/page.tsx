'use client';
import UnifiedSeo from '@/components/seo/unified-seo';
import { useState, useEffect } from 'react';

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      role="alert" aria-live="assertive">
      {message}
      <button onClick={onClose} className="ml-4 text-white font-bold" aria-label="Fechar">×</button>
    </div>
  );
}

function SkeletonUsuariosTable() {
  return (
    <div className="w-full max-w-2xl bg-dark-surface border border-dark-border rounded-lg p-8 animate-pulse">
      <div className="h-6 bg-dark-surface-2 rounded w-1/2 mb-6" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-8 bg-dark-surface-2 rounded mb-4" />
      ))}
    </div>
  );
}

async function fetchAdminUsuarios() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/users`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Erro na API');
    return await res.json();
  } catch (e) {
    return [
      { id: 1, nome: 'Admin', email: 'admin@site.com', role: 'admin' },
      { id: 2, nome: 'Usuário', email: 'user@site.com', role: 'user' },
      { error: true, message: (e as Error).message },
    ];
  }
}

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', role: 'user' });
  const [editId, setEditId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState({ nome: '', email: '', role: 'user' });
  const [removerId, setRemoverId] = useState<number | null>(null);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function carregarUsuarios() {
    setLoading(true);
    setErro('');
    const data = await fetchAdminUsuarios();
    setUsuarios(data.filter((u: any) => !u.error));
    const err = data.find((u: any) => u.error);
    if (err) setErro(err.message);
    setLoading(false);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!novoUsuario.nome.trim() || !novoUsuario.email.trim()) return;
    try {
      const res = await fetch(`${process.env.API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
      });
      if (!res.ok) throw new Error('Erro ao adicionar usuário');
      showToast('Usuário adicionado com sucesso!', 'success');
      setNovoUsuario({ nome: '', email: '', role: 'user' });
      carregarUsuarios();
    } catch {
      showToast('Erro ao adicionar usuário', 'error');
    }
  }

  async function handleEdit(id: number) {
    if (!editUser.nome.trim() || !editUser.email.trim()) return;
    try {
      const res = await fetch(`${process.env.API_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      if (!res.ok) throw new Error('Erro ao editar usuário');
      showToast('Usuário editado com sucesso!', 'success');
      setEditId(null);
      setEditUser({ nome: '', email: '', role: 'user' });
      carregarUsuarios();
    } catch {
      showToast('Erro ao editar usuário', 'error');
    }
  }

  async function handleRemove(id: number) {
    try {
      const res = await fetch(`${process.env.API_URL}/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao remover usuário');
      showToast('Usuário removido com sucesso!', 'success');
      setRemoverId(null);
      carregarUsuarios();
    } catch {
      showToast('Erro ao remover usuário', 'error');
    }
  }

  return (
    <div className="container mx-auto py-12">
      <UnifiedSeo title="Admin - Usuários" description="Gerencie os usuários do site." />
      <h1 className="text-3xl font-bold mb-6">Usuários</h1>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {loading ? (
        <SkeletonUsuariosTable />
      ) : erro ? (
        <div className="mb-4 text-red-500">Erro ao buscar usuários: {erro}</div>
      ) : (
        <>
          <form className="max-w-xl mb-8" onSubmit={handleAdd} aria-label="Adicionar usuário">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 rounded bg-dark-surface-2 border border-dark-border"
                type="text"
                placeholder="Nome"
                value={novoUsuario.nome}
                onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                aria-label="Nome do usuário"
              />
              <input
                className="flex-1 p-2 rounded bg-dark-surface-2 border border-dark-border"
                type="email"
                placeholder="E-mail"
                value={novoUsuario.email}
                onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                aria-label="E-mail do usuário"
              />
              <select
                className="p-2 rounded bg-dark-surface-2 border border-dark-border"
                value={novoUsuario.role}
                onChange={e => setNovoUsuario({ ...novoUsuario, role: e.target.value })}
                aria-label="Perfil do usuário"
              >
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark" aria-label="Adicionar">Adicionar</button>
            </div>
          </form>
          <table className="w-full max-w-2xl bg-dark-surface border border-dark-border rounded-lg">
            <thead>
              <tr className="text-left">
                <th className="p-3">Nome</th>
                <th className="p-3">E-mail</th>
                <th className="p-3">Perfil</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u: any) => (
                <tr key={u.id} className="border-t border-dark-border">
                  <td className="p-3">
                    {editId === u.id ? (
                      <input
                        className="p-2 rounded bg-dark-surface-2 border border-dark-border"
                        value={editUser.nome}
                        onChange={e => setEditUser({ ...editUser, nome: e.target.value })}
                        aria-label="Editar nome do usuário"
                        autoFocus
                      />
                    ) : (
                      u.nome
                    )}
                  </td>
                  <td className="p-3">
                    {editId === u.id ? (
                      <input
                        className="p-2 rounded bg-dark-surface-2 border border-dark-border"
                        value={editUser.email}
                        onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                        aria-label="Editar e-mail do usuário"
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td className="p-3">
                    {editId === u.id ? (
                      <select
                        className="p-2 rounded bg-dark-surface-2 border border-dark-border"
                        value={editUser.role}
                        onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                        aria-label="Editar perfil do usuário"
                      >
                        <option value="user">Usuário</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      u.role
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    {editId === u.id ? (
                      <>
                        <button onClick={() => handleEdit(u.id)} className="bg-green-600 text-white px-3 py-1 rounded" aria-label="Salvar edição">Salvar</button>
                        <button onClick={() => { setEditId(null); setEditUser({ nome: '', email: '', role: 'user' }); }} className="bg-gray-500 text-white px-3 py-1 rounded" aria-label="Cancelar edição">Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditId(u.id); setEditUser({ nome: u.nome, email: u.email, role: u.role }); }} className="bg-blue-600 text-white px-3 py-1 rounded" aria-label="Editar">Editar</button>
                        <button onClick={() => setRemoverId(u.id)} className="bg-red-600 text-white px-3 py-1 rounded" aria-label="Remover">Remover</button>
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
                <p className="mb-6">Tem certeza que deseja remover este usuário?</p>
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