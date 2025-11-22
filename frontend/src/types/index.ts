export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category_id: string;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface TransactionFormData {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category_id: string;
    date: string;
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    created_at: string;
    updated_at: string;
}

export interface CategoryFormData {
    name: string;
    type: 'income' | 'expense';
}