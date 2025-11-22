import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '@/services/categoryService';
import { Category, CategoryFormData } from '@/types';
import { toast } from '@/hooks/use-toast';
export const useCategories = () => {
const [categories, setCategories] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const fetchCategories = useCallback(async () => {
try {
setLoading(true);
const data = await categoryService.getAll();
setCategories(data);
} catch (error) {
toast({ title: 'Erro', description: 'Erro ao carregar categorias', variant: 'destructive' });
} finally {
setLoading(false);
}
}, []);
useEffect(() => { fetchCategories(); }, [fetchCategories]);
const createCategory = async (data: CategoryFormData) => {
try {
const newCategory = await categoryService.create(data);
setCategories(prev => [...prev, newCategory]);
toast({ title: 'Sucesso', description: 'Categoria criada!' });
} catch (error) {
toast({ title: 'Erro', description: 'Erro ao criar', variant: 'destructive' });
}
};
const updateCategory = async (id: string, data: Partial<CategoryFormData>) => {
try {
const updated = await categoryService.update(id, data);
setCategories(prev => prev.map(c => c.id === id ? updated : c));
toast({ title: 'Sucesso', description: 'Categoria atualizada!' });
} catch (error) {
toast({ title: 'Erro', description: 'Erro ao atualizar', variant: 'destructive' });
}
};
const deleteCategory = async (id: string) => {
try {
await categoryService.delete(id);
setCategories(prev => prev.filter(c => c.id !== id));
toast({ title: 'Sucesso', description: 'Categoria removida!' });
} catch (error) {
toast({ title: 'Erro', description: 'Erro ao remover', variant: 'destructive' });
}
};
return { categories, loading, createCategory, updateCategory, deleteCategory };
};
