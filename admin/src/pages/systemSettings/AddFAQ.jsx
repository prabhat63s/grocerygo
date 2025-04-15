import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddFAQ() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/admin/faq/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate('/faq');
      } else {
        alert('Failed to save FAQ');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <CommonLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <ol className="text-2xl font-semibold flex gap-2 items-center">
            <li><Link to="/admin/faq" className="">FAQs</Link></li>
            <li>/</li>
            <li className="">Add New</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Title"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Description"
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="text-end space-x-4">
            <Link to="/admin/faq" className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600">
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
