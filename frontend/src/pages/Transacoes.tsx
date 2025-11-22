import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock data temporário
const mockTransactions = [
    { id: '1', description: 'Salário', amount: 3000, type: 'income' as const },
    { id: '2', description: 'Aluguel', amount: 1200, type: 'expense' as const },
];

const mockCategories = [
    { id: '1', name: 'Salário', type: 'income' as const },
    { id: '2', name: 'Moradia', type: 'expense' as const },
];

const Transacoes = () => {
    const [transactions, setTransactions] = useState(mockTransactions);
    const [isOpen, setIsOpen] = useState(false);
    
    const format = (v: number) => new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(v);

    const handleSubmit = async (data: any) => {
        // Mock - adiciona transação localmente
        const newTransaction = {
            id: Date.now().toString(),
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setIsOpen(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Transações</h1>
                <Button onClick={() => setIsOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Nova Transação
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Todas as Transações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {transactions.map(t => (
                        <div key={t.id} className="flex justify-between p-3 border rounded">
                            <span className="font-medium">{t.description}</span>
                            <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                {format(t.amount)}
                            </span>
                        </div>
                    ))}
                    
                    {transactions.length === 0 && (
                        <p className="text-center text-muted-foreground">
                            Nenhuma transação encontrada.
                        </p>
                    )}
                </CardContent>
            </Card>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nova Transação</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        <p>Formulário de transação aparecerá aqui quando os hooks estiverem configurados.</p>
                        <Button onClick={() => setIsOpen(false)} className="mt-4">
                            Fechar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Transacoes;