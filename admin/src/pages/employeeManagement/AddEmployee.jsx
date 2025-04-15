import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddEmployee() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.role) newErrors.role = 'Role is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const res = await fetch('/admin/employees/save', {
                method: 'POST',
                body: form,
            });

            if (res.ok) {
                navigate('/admin/employees');
            } else {
                alert('Failed to save employee');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/employees">Employee</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow rounded-md p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {['name', 'email', 'mobile', 'password', 'role'].map((field) => (
                            <div key={field}>
                                <label className="block font-medium mb-1 capitalize">
                                    {field} <span className="text-red-500">*</span>
                                </label>
                                {field === 'role' ? (
                                    <select
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className={`w-full border px-3 py-2 rounded-md ${
                                            errors[field] ? 'border-red-500' : ''
                                        }`}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Manager</option>
                                    </select>
                                ) : (
                                    <input
                                        type={field === 'password' ? 'password' : field === 'email' ? 'email' : field === 'mobile' ? 'number' : 'text'}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className={`w-full border px-3 py-2 rounded-md ${
                                            errors[field] ? 'border-red-500' : ''
                                        }`}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    />
                                )}
                                {errors[field] && (
                                    <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            to="/admin/employees"
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
