import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddCustomStatus() {
    const [formData, setFormData] = useState({
        statusType: '',
        orderType: '',
        name: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving custom status:', formData);
        navigate('/custom-status')
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/custom_status">Custom Status</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded-md shadow space-y-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Status Type <span className="text-red-500">*</span></label>
                            <select
                                name="statusType"
                                value={formData.statusType}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            >
                                <option value="">Select</option>
                                <option value="Process">Process</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Order Type <span className="text-red-500">*</span></label>
                            <select
                                name="orderType"
                                value={formData.orderType}
                                onChange={handleChange}
                                required
                                className="w-full border px-4 py-2 rounded"
                            >
                                <option value="">Select</option>
                                <option value="Delivery">Delivery</option>
                                <option value="Takeaway">Takeaway</option>
                                <option value="POS">POS</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/custom-status')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
