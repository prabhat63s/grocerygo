import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddGlobalExtras() {
    // Initialize form data state
    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });

    const navigate = useNavigate();

    // Handle changes for both text and select inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the form data (e.g., send to an API)
        console.log('Form Submitted:', formData);

        // Optionally, navigate back to the Subcategories list after submission
        navigate('/admin/extras');
    };

    // Handle cancel action (navigate back or clear form)
    const handleCancel = () => {
        navigate('/admin/extras');
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/extras">Global Extras </Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                                placeholder="Name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                                placeholder="Price"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </CommonLayout>
    );
}
