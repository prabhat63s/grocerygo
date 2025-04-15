import React from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import { Link, useParams } from 'react-router-dom'

export default function AddBanner() {
    const { id } = useParams();
    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link  to={`/admin/banner/${id}`}> {id.replace(/-/g, ' ').replace(/bannersection/i, 'Banner Section')}</Link> / Add New
                    </h1>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Form Submitted');
                        }}
                    >
                        {/* Hidden section input (extracted section number) */}
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
                                    required
                                    className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                                />
                            </div>

                            {/* Type Select */}
                            <div>
                                <label className="block mb-1 font-medium">Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    className="w-full mt-2 border rounded px-3 py-2"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Category</option>
                                    <option value="2">Product</option>
                                </select>
                            </div>
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
                                className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </CommonLayout>
    )
}
