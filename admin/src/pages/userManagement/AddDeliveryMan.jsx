import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddDeliveryMan() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        identity_type: '',
        identity_number: '',
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
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await fetch('/admin/driver/save', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                navigate('/driver');
            } else {
                alert('Failed to save delivery man.');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/driver" >Delivery Man</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 rounded-md shadow-md bg-white space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                                placeholder="Name"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Mobile <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                                placeholder="Mobile"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Password <span className="text-red-500">*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Identity Type <span className="text-red-500">*</span></label>
                            <select
                                name="identity_type"
                                value={formData.identity_type}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                            >
                                <option value="" disabled>Select</option>
                                <option value="Passport">Passport</option>
                                <option value="Driving License">Driving License</option>
                                <option value="NID">NID</option>
                                <option value="Restaurant Id">Other Document</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Identity Number <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="identity_number"
                                value={formData.identity_number}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                                placeholder="Identity Number"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Identity Image <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            to="/admin/driver"
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
