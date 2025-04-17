import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import useCategory from '../../hook/useCategory';
import { toast } from 'sonner';

export default function AddCategory() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    categoryImage: null,
  });

  const {
    createCategory,
    updateCategory,
    fetchCategoryById,
    category,
    error,
    loading,
  } = useCategory();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id]);

  useEffect(() => {
    if (category && id) {
      setFormData({
        name: category.name,
        categoryImage: category.categoryImage,
      });
    }
  }, [category, id]);


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'categoryImage') {
      setFormData((prev) => ({ ...prev, categoryImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.categoryImage && typeof formData.categoryImage !== "string") {
      data.append("categoryImage", formData.categoryImage);
    }

    if (id) {
      await updateCategory(id, data);
      toast.success('Updated saved successfully');
    } else {
      await createCategory(data);
      toast.success('Category saved successfully');
    }

    navigate('/admin/category');
  };

  const handleCancel = () => {
    navigate('/admin/category');
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/category">Categories</Link> / {`${id ? 'Update' : 'Add New'}`}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                placeholder="Category Name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="categoryImage"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
                className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                required={!id}
              />
              {formData?.categoryImage && (
                <img
                  src={
                    typeof formData.categoryImage === 'string'
                      ? formData.categoryImage
                      : URL.createObjectURL(formData.categoryImage)
                  }
                  alt="Preview"
                  className="w-16  h-16  rounded-md object-cover mt-4 border"
                />
              )}
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}

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
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {loading ? 'Saving' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
