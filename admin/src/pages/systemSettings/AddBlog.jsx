import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function AddBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: '',
    message: '',
    blogImage: null,
  });
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch blog data when editing
  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/blogs/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { title, message, blogImage } = res.data;
        setForm({ title, message, blogImage: null });
        setExistingImage(blogImage);
      } catch (err) {
        console.error('Failed to load blog:', err);
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'blogImage') {
      setForm(prev => ({ ...prev, blogImage: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { title, message, blogImage } = form;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    if (blogImage) {
      formData.append('blogImage', blogImage);
    }

    try {
      const url = id
        ? `${import.meta.env.VITE_BASE_URL}/blogs/${id}`
        : `${import.meta.env.VITE_BASE_URL}/blogs`;
      const method = id ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/admin/blogs');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/blogs">Blogs</Link> / {id ? 'Edit' : 'Add New'}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded-md space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full border px-4 py-2 rounded outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Image {id && existingImage && '(leave blank to keep)'} <span className="text-red-500">*</span>
                </label>
                {existingImage && !form.blogImage && (
                  <img src={existingImage} alt="Current" className="mb-2 max-h-40" />
                )}
                <input
                  type="file"
                  name="blogImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required={!id}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Description"
                  className="w-full border px-4 py-2 rounded outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/admin/blogs"
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
