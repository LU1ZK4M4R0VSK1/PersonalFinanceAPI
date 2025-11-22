import { useState } from 'react';
import { Category, TransactionFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    categories: Category[];
    onSubmit: (data: TransactionFormData) => Promise<void>;
    onCancel: () => void;
}

export const TransactionForm = ({ categories, onSubmit, onCancel }: Props) => {
    const [formData, setFormData] = useState<TransactionFormData>({
        description: "",
        amount: 0,
        type: 'expense',
        category_id: "",
        date: new Date().toISOString().split('T')[0]
    });
    
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Descrição</Label>
                <Input 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    required 
                />
            </div>
            
            <div>
                <Label>Valor</Label>
                <Input 
                    type="number" 
                    value={formData.amount} 
                    onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} 
                    required 
                />
            </div>
            
            <div>
                <Label>Tipo</Label>
                <Select 
                    value={formData.type} 
                    onValueChange={(v: 'income' | 'expense') => setFormData({...formData, type: v})}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="income">Receita</SelectItem>
                        <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            <div>
                <Label>Categoria</Label>
                <Select 
                    value={formData.category_id} 
                    onValueChange={v => setFormData({...formData, category_id: v})}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                        {categories
                            .filter(c => c.type === formData.type)
                            .map(c => (
                                <SelectItem key={c.id} value={c.id}>
                                    {c.name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            
            <div>
                <Label>Data</Label>
                <Input 
                    type="date" 
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})} 
                    required 
                />
            </div>
            
            <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
                <Button variant="outline" onClick={onCancel} type="button">
                    Cancelar
                </Button>
            </div>
        </form>
    );
};