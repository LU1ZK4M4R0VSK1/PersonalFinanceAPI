import { useQuery } from "@tanstack/react-query";
import { financialService } from "../services/financialService";

const Inicio = () => {
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ["financialSummary"],
    queryFn: financialService.getSummary,
  });

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6">Error fetching financial summary.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-2xl">{summary?.totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Expense</h2>
          <p className="text-2xl">{summary?.totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl">{summary?.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
