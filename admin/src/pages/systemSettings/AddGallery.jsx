import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function AddOrEditGallery() {
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [existingImage, setExistingImage] = useState(null);
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/gallery/${id}`)
                .then(res => {
                    setExistingImage(res.data?.galleryImage);
                })
                .catch(err => {
                    console.error("Error fetching gallery item:", err);
                });
        }
    }, [id]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (images.length > 0) {
            formData.append("galleryImage", images[0]);
        }

        try {
            if (id) {
                const response = await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/gallery/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (response.status === 200) {
                    toast.success('Gallery updated successfully!');
                    navigate('/admin/gallery');
                }
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/gallery`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (response.status === 201) {
                    toast.success('Gallery images uploaded successfully!');
                    navigate('/admin/gallery');
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit gallery.');
        }
    };

    return (
        <CommonLayout>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/gallery">Gallery</Link> / {id ? "Update" : "Add New"}
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
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border rounded-md p-1 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50"
                            />
                        </div>
                    </div>

                    {/* Preview Section */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
                            {previewUrls.map((src, index) => (
                                <div key={index} className="rounded overflow-hidden shadow border">
                                    <img
                                        src={src}
                                        alt={`Preview ${index}`}
                                        className="w-full h-[150px] object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Show existing image if no preview */}
                    {existingImage && previewUrls.length === 0 && (
                        <div className="pt-4">
                            <h3 className="mb-2 text-sm font-medium">Current Image:</h3>
                            <img
                                src={existingImage}
                                alt="Current"
                                className="w-[150px] h-[150px] object-cover rounded shadow border"
                            />

                        </div>
                    )}

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
                            {id ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
