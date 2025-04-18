import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommonLayout from '../../components/layout/CommonLayout';
import { toast } from 'sonner';

export default function AddFAQ() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (isEditMode) {
      axios.get(`${import.meta.env.VITE_BASE_URL}/faq/${id}`)
        .then(res => {
          setFormData(res.data);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          alert('Failed to load FAQ');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isEditMode ? `${import.meta.env.VITE_BASE_URL}/faq/${id}` : `${import.meta.env.VITE_BASE_URL}/faq/create`;

    try {
      if (isEditMode) {
        await axios.put(endpoint, formData);
        toast.success('FAQ update successfully');
      } else {
        await axios.post(endpoint, formData);
        toast.error('FAQ saved successfully');
      }
      navigate('/admin/faq');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save FAQ');
    }
  };

  return (
    <CommonLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <ol className="text-2xl font-semibold flex gap-2 items-center">
            <li><Link to="/admin/faq" className="">FAQs</Link></li>
            <li>/</li>
            <li className="">{isEditMode ? 'Edit FAQ' : 'Add New'}</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="text-end space-x-4">
            <Link to="/faq" className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600">
              Cancel
            </Link>
            <button type="submit" className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700">
              {isEditMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
