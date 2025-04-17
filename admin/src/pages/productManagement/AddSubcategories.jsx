import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import useSubCategory from '../../hook/useSubCategory';
import useCategory from '../../hook/useCategory';
import { toast } from 'sonner';

export default function AddSubcategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategory();

  const {
    fetchSubCategoryById,
    updateSubCategory,
    createSubCategory
  } = useSubCategory();

  // Initialize form data state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  });

  // Fetch the subcategory for editing if the `id` exists
  useEffect(() => {
    if (id) {
      fetchSubCategoryById(id).then((data) => {
        setFormData({
          name: data.name,
          category: data.category,
        });
      });
    }
  }, [id, fetchSubCategoryById]);

  // Handle changes for both text and select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If `id` exists, update the subcategory, otherwise create a new one
    if (id) {
      updateSubCategory(id, formData).then(() => {
        navigate('/admin/sub-category');
        toast.success('Updated saved successfully');
      });
    } else {
      createSubCategory(formData).then(() => {
        navigate('/admin/sub-category');
        toast.success('Created saved successfully');
      });
    }
  };

  // Handle cancel action (navigate back or clear form)
  const handleCancel = () => {
    navigate('/admin/sub-category');
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/sub-category">Subcategories</Link> / {id ? 'Update' : 'Add New'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">
                Subcategory Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                placeholder="Subcategory Name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              {id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
