import { useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CategoryForm } from '@/components/Forms/CategoryForm';
const Categorias = () => {
const { categories, createCategory, updateCategory, deleteCategory } = useCategories();
const [isOpen, setIsOpen] = useState(false);
const [editing, setEditing] = useState<any>(null);
const handleSubmit = async (data: any) => {
if (editing) await updateCategory(editing.id, data);
else await createCategory(data);
setIsOpen(false); setEditing(null);
};
return (
<div className="space-y-4">
<div className="flex justify-between items-center">
<h1 className="text-2xl font-bold">Categorias</h1>
<Button onClick={() => setIsOpen(true)}><Plus className="mr-2 h-4 w-4" /> Nova
Categoria</Button>
</div>
<div className="grid gap-4 md:grid-cols-2">
{['income', 'expense'].map(type => (
<Card key={type}>
<CardHeader><CardTitle>{type === 'income' ? 'Receitas' :
'Despesas'}</CardTitle></CardHeader>
<CardContent className="space-y-2">
{categories.filter(c => c.type === type).map(c => (
<div key={c.id} className="flex justify-between items-center p-2 border
rounded">
<span>{c.name}</span>
<div className="flex gap-1">
<Button variant="ghost" size="icon" onClick={() => { setEditing(c);
setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
<Button variant="ghost" size="icon" onClick={() =>
deleteCategory(c.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
</div>
</div>
))}
{categories.filter(c => c.type === type).length === 0 && <p className="text-center
text-sm text-muted-foreground">Vazio</p>}
</CardContent>
</Card>
))}
</div>
<Dialog open={isOpen} onOpenChange={(o) => { if(!o) setEditing(null); setIsOpen(o); }}>
<DialogContent>
<DialogHeader><DialogTitle>{editing ? 'Editar' : 'Nova'}
Categoria</DialogTitle></DialogHeader>
<CategoryForm category={editing} onSubmit={handleSubmit} onCancel={() =>
setIsOpen(false)} />
</DialogContent>
</Dialog>
</div>
);
};
export default Categorias;