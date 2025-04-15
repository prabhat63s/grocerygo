import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddStoreReviews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    rating: '5',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Review:', formData);
    // Add API call logic here
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/reviews">Store Reviews</Link> / Add New
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-md shadow bg-gray-50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Position <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                placeholder="Position"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Rating <span className="text-red-500">*</span></label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                {[1, 2, 3, 4, 5].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Image <span className="text-red-500">*</span></label>
              <input
                type="file"
                name="image"
                required
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/reviews')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
