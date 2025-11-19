import { api } from './api';
import type { FinancialSummary, MonthlyData, CategorySummary } from '../types';

export const financialService = {
  async getSummary(): Promise<FinancialSummary> {
    const response = await api.get<FinancialSummary>('/financial/summary');
    return response.data;
  },

  async getMonthlySummary(): Promise<MonthlyData[]> {
    const response = await api.get<MonthlyData[]>('/financial/reports/monthly-summary');
    return response.data;
  },

  async getCategorySummary(): Promise<CategorySummary[]> {
    const response = await api.get<CategorySummary[]>('/financial/reports/category-summary');
    return response.data;
  },
};
