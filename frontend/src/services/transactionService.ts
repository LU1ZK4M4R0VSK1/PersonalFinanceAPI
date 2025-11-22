import { api } from './api';
import { Transaction, TransactionFormData } from '@/types';
export const transactionService = {
async getAll() { return (await api.get<Transaction[]>('/transactions')).data; },
async create(data: TransactionFormData) { return (await
api.post<Transaction>('/transactions', data)).data; },
async update(id: string, data: Partial<TransactionFormData>) { return (await
api.put<Transaction>(`/transactions/${id}`, data)).data; },
async delete(id: string) { await api.delete(`/transactions/${id}`); }
};