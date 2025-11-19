import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";
import CreateTransactionForm from "../components/CreateTransactionForm";
import EditTransactionForm from "../components/EditTransactionForm";
import type { Transaction } from "../types";

const Transacoes = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const queryClient = useQueryClient();

  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: transactionService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6">Error fetching transactions.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Transações</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Transaction
        </button>
      </div>
      {isCreateModalOpen && <CreateTransactionForm onClose={() => setCreateModalOpen(false)} />}
      {isEditModalOpen && selectedTransaction && (
        <EditTransactionForm
          transaction={selectedTransaction}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Description</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Type</th>
            <th className="py-2">Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.type}</td>
              <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(transaction)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(transaction.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transacoes;
