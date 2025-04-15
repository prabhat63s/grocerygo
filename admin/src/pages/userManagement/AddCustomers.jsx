import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddCustomers() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/admin/users/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/users');
            } else {
                alert('Failed to save customer');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/users" >Customers</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 rounded-md shadow-md bg-white space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block font-medium mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block font-medium mb-1">
                                Mobile <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Mobile"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            to="/admin/users"
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
