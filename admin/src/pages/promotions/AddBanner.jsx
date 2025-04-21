import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import useCategory from '../../hook/useCategory';
import { useProduct } from '../../hook/useProduct';

export default function AddBanner() {
  const { id, bannerId } = useParams();
  const { token } = useAuth();
  const { categories } = useCategory();
  const { products } = useProduct();

  console.log(categories)
  console.log(products)
  const navigate = useNavigate();

  const [bannerImage, setBannerImage] = useState(null);
  const [selectedType, setSelectedType] = useState(""); // 1: categories, 2: products
  const [selectedValue, setSelectedValue] = useState("");
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditMode = !!bannerId;

  useEffect(() => {
    const fetchBanner = async () => {
      if (!isEditMode || !token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/banner/${bannerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const banner = res.data;
        setSelectedType(banner.type || '');
        setSelectedValue(banner.category || banner.product || '');
        setPreviewImage(banner.bannerImage);
      } catch (err) {
        console.error('Failed to fetch banner:', err);
      }
    };

    fetchBanner();
  }, [bannerId, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType || !selectedValue || (!bannerImage && !isEditMode)) return;

    const formData = new FormData();
    formData.append('type', selectedType);
    formData.append('section', id.split('-')[1]);
    if (selectedType === "1") {
      formData.append('category', selectedValue);
    } else {
      formData.append('product', selectedValue);
    }
    if (bannerImage) formData.append('bannerImage', bannerImage);

    try {
      setLoading(true);
      if (isEditMode) {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/banner/${bannerId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/banner`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      navigate(`/admin/banner/${id}`);
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const sectionTitle = id
    .replace(/-/g, ' ')
    .replace(/bannersection/i, 'Banner Section')
    .replace(/\b\w/g, char => char.toUpperCase());

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to={`/admin/banner/${id}`}>{sectionTitle}</Link> / {isEditMode ? 'Edit' : 'Add New'}
          </h1>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="hidden" name="section" value={id.split('-')[1]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block mb-1 font-medium">
                  Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 h-32 rounded" />
                )}
              </div>

              {/* Type Select */}
              <div>
                <label className="block mb-1 font-medium">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setSelectedValue('');
                  }}
                  className="w-full mt-2 border rounded px-3 py-2"
                  required
                >
                  <option value="">Select</option>
                  <option value="1">Category</option>
                  <option value="2">Product</option>
                </select>
              </div>
            </div>

            {/* Select Category or Product */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {selectedType === "1" && (
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="w-full mt-2 border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedType === "2" && (
                <div>
                  <label className="block mb-1 font-medium">Product</label>
                  <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="w-full mt-2 border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Product</option>
                    {products?.map(prod => (
                      <option key={prod._id} value={prod._id}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <Link
                to={`/admin/banner/${id}`}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </CommonLayout>
  );
}
