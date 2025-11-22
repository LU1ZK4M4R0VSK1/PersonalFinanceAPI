import { api } from './api';
import { Category, CategoryFormData } from '@/types';

export const categoryService = {
    async getAll() { return (await api.get<Category[]>('/categories')).data; },
    async create(data: CategoryFormData) { return (await api.post<Category>('/categories', data)).data; },
    async update(id: string, data: Partial<CategoryFormData>) { return (await api.put<Category>(`/categories/${id}`, data)).data; },
    async delete(id: string) { await api.delete(`/categories/${id}`); }
};