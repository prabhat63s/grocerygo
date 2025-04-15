import React, { useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout';
import { Link } from 'react-router-dom';

export default function AddGallery() {
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = new FormData();
        images.forEach((file) => {
            formData.append("image[]", file);
        });

        // TODO: Replace this with your actual API call
        console.log("Submitting images:", images);
    };

    return (
        <CommonLayout>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/gallery">Gallery</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow w-full rounded-md p-6 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-2">
                                Image <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                name="image[]"
                                accept="image/*"
                                multiple
                                required
                                onChange={handleFileChange}
                                className="w-full border rounded-md p-1 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <a
                            href="/admin/gallery"
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded hover:bg-neutral-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    )
}

