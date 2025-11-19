import { useQuery } from "@tanstack/react-query";
import { financialService } from "../services/financialService";

const Relatorios = () => {
  const { data: monthlySummary, isLoading: isLoadingMonthly, isError: isErrorMonthly } = useQuery({
    queryKey: ["monthlySummary"],
    queryFn: financialService.getMonthlySummary,
  });

  const { data: categorySummary, isLoading: isLoadingCategory, isError: isErrorCategory } = useQuery({
    queryKey: ["categorySummary"],
    queryFn: financialService.getCategorySummary,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Relatórios</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Resumo Mensal</h2>
        {isLoadingMonthly && <p>Loading...</p>}
        {isErrorMonthly && <p>Error fetching monthly summary.</p>}
        {monthlySummary && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Mês</th>
                <th className="py-2">Receita</th>
                <th className="py-2">Despesa</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.map((summary) => (
                <tr key={summary.month}>
                  <td className="border px-4 py-2">{summary.month}</td>
                  <td className="border px-4 py-2">{summary.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="border px-4 py-2">{summary.expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Resumo por Categoria</h2>
        {isLoadingCategory && <p>Loading...</p>}
        {isErrorCategory && <p>Error fetching category summary.</p>}
        {categorySummary && (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Categoria</th>
                <th className="py-2">Valor</th>
                <th className="py-2">Percentual</th>
              </tr>
            </thead>
            <tbody>
              {categorySummary.map((summary) => (
                <tr key={summary.category}>
                  <td className="border px-4 py-2">{summary.category}</td>
                  <td className="border px-4 py-2">{summary.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="border px-4 py-2">{summary.percentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Relatorios;
