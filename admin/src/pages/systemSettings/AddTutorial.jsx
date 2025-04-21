import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function AddTutorial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: '',
    message: '',
    tutorialImage: null,
  });
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch tutorial data when editing
  useEffect(() => {
    if (!id) return;
    const fetchTutorial = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/tutorial/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { title, message, tutorialImage } = res.data;
        setForm({ title, message, tutorialImage: null });
        setExistingImage(tutorialImage);
      } catch (err) {
        console.error('Failed to load tutorial:', err);
      }
    };
    fetchTutorial();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'tutorialImage') {
      setForm(prev => ({ ...prev, tutorialImage: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('message', form.message);
    if (form.tutorialImage) {
      formData.append('tutorialImage', form.tutorialImage);
    }

    try {
      const url = id
        ? `${import.meta.env.VITE_BASE_URL}/tutorial/${id}`
        : `${import.meta.env.VITE_BASE_URL}/tutorial`;
      const method = id ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/admin/tutorial');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save tutorial.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <ol className="text-2xl font-semibold flex gap-1 items-center">
            <li><Link to="/tutorial">Tutorial</Link></li>
            <li>/ {id ? 'Edit' : 'Add New'}</li>
          </ol>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter tutorial title"
                required
                className="w-full border px-4 py-2 rounded"
              />

              <div className="mt-4">
                <label className="block mb-1 font-medium">
                  Image {id ? '' : <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  name="tutorialImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required={!id}
                />
                {(form.tutorialImage || existingImage) && (
                  <img
                    src={
                      form.tutorialImage
                        ? URL.createObjectURL(form.tutorialImage)
                        : existingImage
                    }
                    alt="Preview"
                    className="mt-2 h-24 rounded border"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter tutorial description"
                rows="6"
                required
                className="w-full border px-4 py-2 rounded"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/tutorial"
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
