import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaExclamationCircle, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { FaX } from 'react-icons/fa6';

export default function Slider() {
    const [sliders, setSliders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const fetchSliders = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/sliders`);
            setSliders(data);
        } catch (error) {
            console.error("Failed to fetch sliders", error);
        }
    };
    useEffect(() => {
        fetchSliders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this slider?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/sliders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSliders(prev => prev.filter(slider => slider._id !== id));
            } catch (err) {
                console.error("Failed to delete slider", err);
            }
        }
    };

    // toggle status of a category
    const handleToggleStatus = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_BASE_URL}/sliders/${id}/toggle-status`);

            fetchSliders();
        } catch (err) {
            console.error("Status toggle failed:", err);
        }
    };

    // Filter categories based on search
    const filteredSliders = sliders.filter(slider =>
        (slider.product || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSliders.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    // Only show the rows on the current page
    const currentSliders = filteredSliders.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Slider</h1>
                    <Link to='/admin/slider/add' className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
                        <FaPlus /> Add New
                    </Link>
                </div>

                <div className="flex items-center gap-2 p-3 bg-red-50 border rounded-md">
                    <FaExclamationCircle />This section is available only for website
                </div>

                <div className="p-4 bg-white rounded-md shadow">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                        <div className="flex w-full gap-2">
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
                        </div>
                        <div className="flex items-center justify-between md:justify-end w-full gap-1">
                            <span>Search:</span>
                            <input
                                type="search"
                                placeholder="Search by product name"
                                className="border w-full md:w-fit px-4 py-1 rounded-md outline-none"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full text-sm border border-gray-200 rounded-md">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border px-4 py-2 text-left">#</th>
                                    <th className="border px-4 py-2 text-left">Image</th>
                                    <th className="border px-4 py-2 text-left">Title</th>
                                    <th className="border px-4 py-2 text-left">Category</th>
                                    <th className="border px-4 py-2 text-left">Product</th>
                                    <th className="border px-4 py-2 text-left">Description</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSliders.map((slider, idx) => (
                                    <tr
                                        key={idx}
                                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                    >
                                        <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-4 py-2"><img src={slider.image} alt="Slider" className="h-12 rounded" /></td>
                                        <td className="border px-4 py-2">{slider.title || '--'}</td>
                                        <td className="border px-4 py-2">{slider?.category?.name || "--"}</td>
                                        <td className="border px-4 py-2">{slider?.product?.name || "--"}</td>
                                        <td className="border px-4 py-2">{slider.description || '--'}</td>
                                        <td className="border px-4 py-2">
                                            <span
                                                onClick={() => handleToggleStatus(slider._id)}
                                                className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${slider.status ? "bg-green-500" : "bg-red-500"}`}
                                            >
                                                {slider.status ? <FaCheck /> : <FaX />}
                                            </span>
                                        </td>
                                        <td className="border px-3 py-2">{new Date(slider.createdAt).toLocaleString()}</td>
                                        <td className="border px-3 py-2">{new Date(slider.updatedAt).toLocaleString()}</td>
                                        <td className="border px-4 py-2 text-white">
                                            <div className="flex items-center gap-2">
                                                <Link to={`/admin/slider/${slider._id}`} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => handleDelete(slider._id)} className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing{" "}
                            {filteredSliders.length === 0
                                ? "0 to 0"
                                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredSliders.length)}`}{" "}
                            of {filteredSliders.length} entries

                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
