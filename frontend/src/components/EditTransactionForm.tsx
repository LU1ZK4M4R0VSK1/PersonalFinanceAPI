import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { transactionService } from "../services/transactionService";
import { categoryService } from "../services/categoryService";
import type { Transaction, TransactionFormData } from "../types";

interface EditTransactionFormProps {
  transaction: Transaction;
  onClose: () => void;
}

const EditTransactionForm = ({ transaction, onClose }: EditTransactionFormProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    defaultValues: {
      ...transaction,
      date: new Date(transaction.date).toISOString().split('T')[0],
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<TransactionFormData>) => transactionService.update(transaction.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      onClose();
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    updateMutation.mutate({
      ...data,
      amount: Number(data.amount),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Transaction</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" {...register("description", { required: true })} id="description" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {errors.description && <p className="text-red-500 text-xs mt-1">Description is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" {...register("amount", { required: true, valueAsNumber: true })} id="amount" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {errors.amount && <p className="text-red-500 text-xs mt-1">Amount is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select {...register("type", { required: true })} id="type" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">Type is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
            <select {...register("category_id", { required: true })} id="category_id" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {categories?.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">Category is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" {...register("date", { required: true })} id="date" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {errors.date && <p className="text-red-500 text-xs mt-1">Date is required.</p>}
          </div>
          <div className="items-center px-4 py-3">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              Save
            </button>
            <button type="button" onClick={onClose} className="mt-2 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionForm;
