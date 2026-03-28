import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu.jsx";
import { FaShapes, FaEdit, FaPlusCircle } from "react-icons/fa";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} created successfully.`);
      refetch();
    } catch (error) {
      toast.error("Failed to create category.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        name: updatingName,
      }).unwrap();
      toast.success(`${result.name} updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`Category deleted`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
      refetch();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-32">
      <AdminMenu />

      <div className="container mx-auto px-5 pt-[6rem]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-500">
            <FaShapes size={24} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight uppercase">
            Manage <span className="text-pink-500">Categories</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Create Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-md sticky top-[8rem] shadow-2xl">
              <h2 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-6 text-slate-400">
                <FaPlusCircle className="text-indigo-500" /> Add New Category
              </h2>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateCategory}
                buttonText="Create"
              />
            </div>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-4">
              {categories?.map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                  className="group flex items-center gap-3 bg-slate-900/60 border border-slate-800 px-6 py-4 rounded-2xl transition-all hover:border-pink-500/50 hover:bg-pink-500/5 hover:-translate-y-1 active:scale-95 shadow-xl"
                >
                  <span className="font-bold text-slate-200 group-hover:text-pink-400">
                    {category.name}
                  </span>
                  <FaEdit
                    size={14}
                    className="text-slate-600 group-hover:text-pink-400"
                  />
                </button>
              ))}
            </div>

            {categories?.length === 0 && (
              <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-900/20">
                <p className="text-slate-500 font-medium italic">
                  No categories found.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Update Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="p-8 bg-[#0a0a0c] rounded-[2.5rem] border border-slate-800 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">
              Update Category
            </h3>
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateCategory}
              buttonText="Save Changes"
              handleDelete={handleDeleteCategory}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
