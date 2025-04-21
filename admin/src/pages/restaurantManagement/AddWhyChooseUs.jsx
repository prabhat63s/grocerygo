import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { useAuth } from '../../context/AuthContext';

export default function AddWhyChooseUs() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        subTitle: '',
        whyChooseUsContentImage: null,
    });

    const [existingImage, setExistingImage] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchData = async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/why-choose-us/${id}`);
                    const data = await res.json();
                    setFormData({
                        title: data.title || '',
                        subTitle: data.subTitle || '',
                        whyChooseUsContentImage: null,
                    });
                    setExistingImage(data.whyChooseUsContentImage || '');
                } catch (err) {
                    console.error('Failed to fetch data:', err);
                }
            };

            fetchData();
        }
    }, [id, isEditMode]);

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
        form.append('subTitle', formData.subTitle);
        if (formData.whyChooseUsContentImage) {
            form.append('whyChooseUsContentImage', formData.whyChooseUsContentImage);
        }

        const url = isEditMode
            ? `${import.meta.env.VITE_BASE_URL}/why-choose-us/${id}`
            : `${import.meta.env.VITE_BASE_URL}/why-choose-us`;
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            });

            if (response.ok) {
                navigate('/admin/choose_us');
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
                        <Link to="/admin/choose_us">Why Choose Us</Link> / {isEditMode ? 'Edit' : 'Add New'}
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
                                name="subTitle"
                                value={formData.subTitle}
                                onChange={handleChange}
                                rows="1"
                                required
                                placeholder="Subtitle"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Image {isEditMode ? '' : <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type="file"
                                name="whyChooseUsContentImage"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                            {existingImage && (
                                <img
                                    src={existingImage}
                                    alt="Existing"
                                    className="mt-2 rounded-md w-40 h-auto border"
                                />
                            )}
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
                            {isEditMode ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
