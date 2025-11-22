import { useState } from 'react';
import { Category, CategoryFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from
'@/components/ui/select';
interface Props {
category?: Category;
onSubmit: (data: CategoryFormData) => Promise<void>;
onCancel: () => void;
}
export const CategoryForm = ({ category, onSubmit, onCancel }: Props) => {
const [formData, setFormData] = useState<CategoryFormData>({
name: category?.name || '', type: category?.type || 'expense'
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
<div><Label>Nome</Label><Input value={formData.name} onChange={e =>
setFormData({...formData, name: e.target.value})} required /></div>
<div>
<Label>Tipo</Label>
<Select value={formData.type} onValueChange={(v: any) => setFormData({...formData,
type: v})}>
<SelectTrigger><SelectValue /></SelectTrigger>
<SelectContent><SelectItem value="income">Receita</SelectItem><SelectItem
value="expense">Despesa</SelectItem></SelectContent>
</Select>
</div>
<div className="flex gap-2"><Button type="submit"
disabled={loading}>Salvar</Button><Button variant="outline"
onClick={onCancel}>Cancelar</Button></div>
</form>
);
};