import { Home, Receipt, FolderKanban, BarChart3 } from 'lucide-react';
import { NavLink } from '@/components/NavLink';

const navItems = [
    { title: 'Inicio', url: '/', icon: Home },
    { title: 'Transações', url: '/transacoes', icon: Receipt },
    { title: 'Categorias', url: '/categorias', icon: FolderKanban },
    { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
];

export const Sidebar = () => {
    return (
        <aside
            id="sidebar"
            className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-56 -translate-x-full border-r bg-background transition-transform lg:translate-x-0"
        >
            <nav className="flex flex-col gap-1 p-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.url}
                        to={item.url}
                        end={item.url === '/'}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        activeClassName="bg-primary/10 text-primary font-medium"
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};