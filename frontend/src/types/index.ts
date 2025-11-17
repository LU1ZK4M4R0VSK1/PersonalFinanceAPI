export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category_id: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  created_at?: string;
  updated_at?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface CategorySummary {
  category: string;
  amount: number;
  percentage: number;
}

export type TransactionFormData = Omit<Transaction, 'id' | 'created_at' | 'updated_at'>;
export type CategoryFormData = Omit<Category, 'id' | 'created_at' | 'updated_at'>;
