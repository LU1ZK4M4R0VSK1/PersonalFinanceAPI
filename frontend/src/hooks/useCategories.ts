import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '@/services/categoryService';
import { Category, CategoryFormData } from '@/types';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
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
            return true;
        } catch (error) {
            console.error('Error creating category:', error);
            return false;
        }
    };

    const updateCategory = async (id: string, data: Partial<CategoryFormData>) => {
        try {
            const updated = await categoryService.update(id, data);
            setCategories(prev => prev.map(c => c.id === id ? updated : c));
            return true;
        } catch (error) {
            console.error('Error updating category:', error);
            return false;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await categoryService.delete(id);
            setCategories(prev => prev.filter(c => c.id !== id));
            return true;
        } catch (error) {
            console.error('Error deleting category:', error);
            return false;
        }
    };

    return { categories, loading, createCategory, updateCategory, deleteCategory };
};