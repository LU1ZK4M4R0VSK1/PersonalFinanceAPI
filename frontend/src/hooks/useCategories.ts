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
            toast({ 
                title: 'Error', 
                description: 'Erro ao carregar categorias', 
                variant: 'destructive' 
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { 
        fetchCategories(); 
    }, [fetchCategories]);

    const createCategory = async (data: CategoryFormData) => {
        try {
            const newCategory = await categoryService.create(data);
            setCategories(prev => [...prev, newCategory]);
            toast({ 
                title: 'Success', 
                description: 'Categoria criada!' 
            });
        } catch (error) {
            toast({ 
                title: 'Error', 
                description: 'Erro ao criar categoria', 
                variant: 'destructive' 
            });
        }
    };

    const updateCategory = async (id: string, data: Partial<CategoryFormData>) => {
        try {
            const updated = await categoryService.update(id, data);
            setCategories(prev => prev.map(c => c.id === id ? updated : c));
            toast({ 
                title: 'Success', 
                description: 'Categoria atualizada!' 
            });
        } catch (error) {
            toast({ 
                title: 'Error', 
                description: 'Erro ao atualizar categoria', 
                variant: 'destructive' 
            });
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await categoryService.delete(id);
            setCategories(prev => prev.filter(c => c.id !== id));
            toast({ 
                title: 'Success', 
                description: 'Categoria removida!' 
            });
        } catch (error) {
            toast({ 
                title: 'Error', 
                description: 'Erro ao remover categoria', 
                variant: 'destructive' 
            });
        }
    };

    return { categories, loading, createCategory, updateCategory, deleteCategory };
};