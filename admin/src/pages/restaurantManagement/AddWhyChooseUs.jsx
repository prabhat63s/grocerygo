import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddWhyChooseUs() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        image: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', formData.title);
        form.append('subtitle', formData.subtitle);
        form.append('image', formData.image);

        try {
            const response = await fetch('/admin/choose_us/save', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                navigate('/choose_us');
            } else {
                alert('Failed to save data.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred.');
        }
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/choose_us">Why Choose Us</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Title"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Subtitle <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                rows="1"
                                required
                                placeholder="Subtitle"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Image <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link
                            to="/admin/choose_us"
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
