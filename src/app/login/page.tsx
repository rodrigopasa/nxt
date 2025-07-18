'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UnifiedSeo from '@/components/seo/unified-seo';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha }),
      credentials: 'include',
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      setErro('Usuário ou senha inválidos');
    }
  }

  return (
    <div className="container mx-auto py-24 flex flex-col items-center justify-center min-h-screen">
      <UnifiedSeo title="Login" description="Acesse o painel administrativo do site." />
      <div className="max-w-md w-full bg-dark-surface border border-dark-border rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Usuário</label>
            <input className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border"
              type="text" value={usuario} onChange={e => setUsuario(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Senha</label>
            <input className="w-full p-2 rounded bg-dark-surface-2 border border-dark-border"
              type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          {erro && <div className="mb-4 text-red-500">{erro}</div>}
          <button type="submit" className="w-full bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Entrar</button>
        </form>
      </div>
    </div>
  );
} 