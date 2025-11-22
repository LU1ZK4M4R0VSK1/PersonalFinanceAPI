import { Wallet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.toggle('translate-x-0');
        sidebar?.classList.toggle('-translate-x-full');
    };

    return (
        <header className="border-b bg-background">
            <div className="flex h-14 items-center px-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden mr-2"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 font-semibold">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span>Finanças Pessoais</span>
                </div>
            </div>
        </header>
    );
};