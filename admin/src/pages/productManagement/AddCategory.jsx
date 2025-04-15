import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddCategory() {
  // Initialize form data state
  const [formData, setFormData] = useState({
    name: '',
    categoryImage: null,
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'categoryImage') {
      // For file inputs, store the File object
      setFormData((prev) => ({ ...prev, categoryImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., send to an API)
    console.log('Form Submitted:', formData);

    // Optionally, navigate back to the Categories list after submission
    navigate('/admin/category');
  };

  // Handle cancel action (navigate back or clear form)
  const handleCancel = () => {
    navigate('/admin/category');
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/category">Categories</Link> / Add New
          </h1>
        </div>

        <form onSubmit={handleSubmit} className='p-4 rounded-md shadow-md bg-white'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Category Name <span className="text-red-500">*</span></label>
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
              <label className="block mb-1 font-medium">Image <span className="text-red-500">*</span></label>
              <input
                type="file"
                name="categoryImage"
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
                className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
              />

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
              Save
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
