import { useMemo } from 'react';
import { Transaction } from '@/types';

export const useFinancialSummary = (transactions: Transaction[]) => {
    return useMemo(() => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);
        
        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            transactionCount: transactions.length
        };
    }, [transactions]);
};