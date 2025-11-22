import { useState, useEffect, useCallback } from 'react';
import { transactionService } from '@/services/transactionService';
import { Transaction, TransactionFormData } from '@/types';
import { toast } from '@/hooks/use-toast';
export const useTransactions = () => {
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [loading, setLoading] = useState(true);
const fetchTransactions = useCallback(async () => {
try {
setLoading(true);
const data = await transactionService.getAll();
setTransactions(data);
} catch (error) {
toast({ title: 'Erro', description: 'Erro ao carregar transações', variant: 'destructive' });
} finally {
setLoading(false);
}
}, []);
useEffect(() => { fetchTransactions(); }, [fetchTransactions]);
const createTransaction = async (data: TransactionFormData) => {
try {
const newTransaction = await transactionService.create(data);
setTransactions(prev => [newTransaction, ...prev]);
toast({ title: 'Sucesso', description: 'Transação criada!' });
} catch (error) {
toast({ title: 'Erro', description: 'Erro ao criar', variant: 'destructive' });
}
};
return { transactions, loading, createTransaction };
};
