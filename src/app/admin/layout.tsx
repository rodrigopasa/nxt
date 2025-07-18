'use client';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    // Remove o cookie 'token' (apenas client-side, para httpOnly precisa de endpoint logout)
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/login');
  }

  return (
    <div>
      <header className="w-full bg-dark-surface border-b border-dark-border p-4 flex justify-between items-center">
        <span className="font-bold text-lg">Painel Admin</span>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sair</button>
      </header>
      <main>{children}</main>
    </div>
  );
} 