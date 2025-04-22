import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import useCategory from '../../hook/useCategory';
import { useProduct } from '../../hook/useProduct';

export default function AddSlider() {
    const { categories } = useCategory();
    const { token } = useAuth();
    const { products, fetchAllProducts } = useProduct();

    useEffect(() => {
      fetchAllProducts();
    }, []);
    
    const [type, setType] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        type: '',
        cat_id: '',
        item_id: '',
        custom_link: '',
        link_text: '',
        description: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');


    const handleTypeChange = (e) => {
        const value = e.target.value;
        setType(value);
        setFormData({ ...formData, type: value, cat_id: '', item_id: '', custom_link: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!id) return;

        const fetchSlider = async () => {
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/sliders/${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const s = res.data;

            setFormData({
                title: s.title || '',
                image: null,
                type: s.type || '',
                cat_id: s.category?._id || '',
                item_id: s.product?._id || '',
                custom_link: s.customLink || '',
                link_text: s.textLink || '',
                description: s.description || '',
              });
              setType(s.type || '');
              setImageUrl(s.image);
          } catch (err) {
            console.error('Failed to load slider:', err);
          }
        };

        fetchSlider();
      }, [id, token]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) payload.append(key, value);
        });

        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          };

          if (id) {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/sliders/${id}`, payload, config);
        } else {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/sliders`, payload, config);
        }


          navigate('/admin/slider');
        } catch (err) {
          console.error('Slider save error:', err);
          alert('Something went wrong!');
        }
      };


    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/slider">Sliders</Link> / {id ? 'Update' : 'Add New'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Image <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setFormData(prev => ({ ...prev, image: file }));
                                        if (file) {
                                            setImageUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                                />
                                {imageUrl && (
                                    <div className="mt-3">
                                        <img
                                            src={imageUrl}
                                            alt="Slider Preview"
                                            className="w-40 h-auto border rounded shadow"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleTypeChange}
                                    className="w-full border rounded px-3 py-2 bg-white"
                                >
                                    <option value="">Select</option>
                                    <option value="category">Category</option>
                                    <option value="product">Product</option>
                                    <option value="custom-link">Custom Link</option>
                                </select>
                            </div>


                            {/* Conditional Category */}
                            {type === "category" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="cat_id"
                                        value={formData.cat_id}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 bg-white"
                                    >
                                        <option value="">Select</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Conditional Product */}
                            {type === "product" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Product <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="item_id"
                                        value={formData.item_id}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 bg-white"
                                    >
                                        <option value="">Select</option>
                                        {products?.map(prod => (
                                            <option key={prod._id} value={prod._id}>
                                                {prod.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Conditional Custom Link */}
                            {type === "custom-link" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Custom Link <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="custom_link"
                                        value={formData.custom_link}
                                        onChange={handleChange}
                                        placeholder="Custom Link"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* Link Text */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Link Text</label>
                                <input
                                    type="text"
                                    name="link_text"
                                    value={formData.link_text}
                                    onChange={handleChange}
                                    placeholder="Link Text"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Description"
                                    className="w-full border rounded px-3 py-2"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Link
                            to="/admin/slider"
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-black hover:bg-neutral-700 text-white px-6 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
