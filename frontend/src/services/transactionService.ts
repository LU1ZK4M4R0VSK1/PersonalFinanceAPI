import { api } from './api';
import type { Transaction, TransactionFormData } from '../types';
export const transactionService = {
async getAll(): Promise<Transaction[]> {
const response = await api.get<Transaction[]>('/transactions');
return response.data;
},
async getById(id: string): Promise<Transaction> {
const response = await api.get<Transaction>(`/transactions/${id}`);
return response.data;
},
async create(data: TransactionFormData): Promise<Transaction> {
const response = await api.post<Transaction>('/transactions', data);
return response.data;
},
async update(id: string, data: Partial<TransactionFormData>):
Promise<Transaction> {
const response = await api.put<Transaction>(`/transactions/${id}`,
data);
return response.data;
},
async delete(id: string): Promise<void> {
await api.delete(`/transactions/${id}`);
},
async getByDateRange(startDate: string, endDate: string):
Promise<Transaction[]> {
const response = await api.get<Transaction[]>('/transactions', {
params: { startDate, endDate }
});
return response.data;
}
};