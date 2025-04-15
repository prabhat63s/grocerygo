import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddSlider() {
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

    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setType(value);
        setFormData({ ...formData, type: value, cat_id: '', item_id: '', custom_link: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add form validation here if needed
        console.log('Form Submitted:', formData);
        navigate('/admin/slider');
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/slider">Sliders</Link> / Add New
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
                                    onChange={handleFileChange}
                                    required
                                    className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                                />
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
                                    <option value="1">Category</option>
                                    <option value="2">Product</option>
                                    <option value="3">Custom Link</option>
                                </select>
                            </div>

                            {/* Conditional Category */}
                            {type === "1" && (
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
                                        <option value="2">Vegetables</option>
                                        <option value="3">Condiments & Spices</option>
                                        <option value="9">Bread & Bakery</option>
                                        <option value="5">Beverage</option>
                                        <option value="8">Snacks</option>
                                        <option value="6">Dairy Products</option>
                                        <option value="7">Meat</option>
                                        <option value="4">Personal Care</option>
                                        <option value="1">Fruits</option>
                                        <option value="10">Cleaning Supplies</option>
                                    </select>
                                </div>
                            )}

                            {/* Conditional Product */}
                            {type === "2" && (
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
                                        <option value="32">Nescafe Classic Instant Coffee</option>
                                        <option value="31">Banana Chips - 170 g</option>
                                        <option value="30">Lay's Magic Masala Chips</option>
                                        <option value="29">Uncle Chipps Spicy Treat</option>
                                        <option value="28">Kurkure Masala Munch</option>
                                        <option value="26">Meatzza Chicken Wings</option>
                                        <option value="27">Chicken Wings - 500gm</option>
                                        <option value="20">Hide & Seek Cookies</option>
                                        <option value="41">Amul Full Cream Milk</option>
                                    </select>
                                </div>
                            )}

                            {/* Conditional Custom Link */}
                            {type === "3" && (
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
