import { useState, useEffect, useCallback } from 'react';
import { transactionService } from '@/services/transactionService';
import { Transaction, TransactionFormData } from '@/types';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await transactionService.getAll();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { 
        fetchTransactions(); 
    }, [fetchTransactions]);

    const createTransaction = async (data: TransactionFormData) => {
        try {
            const newTransaction = await transactionService.create(data);
            setTransactions(prev => [newTransaction, ...prev]);
            return true;
        } catch (error) {
            console.error('Error creating transaction:', error);
            return false;
        }
    };

    return { transactions, loading, createTransaction, fetchTransactions };
};