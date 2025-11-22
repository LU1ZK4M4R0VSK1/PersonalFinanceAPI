import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TransactionForm } from '@/components/Forms/TransactionForm';

const Transacoes = () => {
    const { transactions, createTransaction } = useTransactions();
    const { categories } = useCategories();
    const [isOpen, setIsOpen] = useState(false);
    
    const format = (v: number) => new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(v);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Transações</h1>
                <Button onClick={() => setIsOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> 
                    Nova Transação
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
                    <TransactionForm 
                        categories={categories} 
                        onSubmit={async (d) => { 
                            await createTransaction(d); 
                            setIsOpen(false); 
                        }} 
                        onCancel={() => setIsOpen(false)} 
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Transacoes;