import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { categoryService } from "../services/categoryService";
import type { Category, CategoryFormData } from "../types";

interface EditCategoryFormProps {
  category: Category;
  onClose: () => void;
}

const EditCategoryForm = ({ category, onClose }: EditCategoryFormProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: category,
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CategoryFormData>) => categoryService.update(category.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Category</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" {...register("name", { required: true })} id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select {...register("type", { required: true })} id="type" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">Type is required.</p>}
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

export default EditCategoryForm;
