import Link from 'next/link';
// ... outros imports necessários (adapte conforme necessário)

export default function Sidebar({ className }: { className?: string }) {
  // Aqui você pode buscar dados no servidor ou receber via props
  // Por enquanto, estrutura estática para SSR
  return (
    <aside className={className || ''}>
      <nav className="p-4">
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase text-gray-400 mb-2">Navegação</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-surface-2">
                <span>Início</span>
              </Link>
            </li>
            <li>
              <Link href="/explorar" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-surface-2">
                <span>Explorar</span>
              </Link>
            </li>
            <li>
              <Link href="/recentes" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-surface-2">
                <span>Recentes</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Outras seções podem ser migradas depois */}
      </nav>
    </aside>
  );
} 