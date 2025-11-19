import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";
import CreateCategoryForm from "../components/CreateCategoryForm";
import EditCategoryForm from "../components/EditCategoryForm";
import type { Category } from "../types";

const Categorias = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const queryClient = useQueryClient();

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: categoryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6">Error fetching categories.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Categorias</h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Category
        </button>
      </div>
      {isCreateModalOpen && <CreateCategoryForm onClose={() => setCreateModalOpen(false)} />}
      {isEditModalOpen && selectedCategory && (
        <EditCategoryForm
          category={selectedCategory}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Type</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.type}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditClick(category)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(category.id)}
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

export default Categorias;
