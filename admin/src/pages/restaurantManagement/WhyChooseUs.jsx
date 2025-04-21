import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ChooseUsUI from "./ChooseUsUI";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function WhyChooseUs() {
    const [search, setSearch] = useState("");
    const [whyChooseUsContent, setWhyChooseUsContent] = useState([]);
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const { token } = useAuth();

    const fetchWhyChooseUsContent = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/why-choose-us`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWhyChooseUsContent(res.data);
        } catch (error) {
            console.error('Failed to fetch team:', error);
        }
    };

    useEffect(() => {
        fetchWhyChooseUsContent();
    }, []);



    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this member?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/why-choose-us/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchWhyChooseUsContent(); // Refresh the list
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const filteredList = whyChooseUsContent.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredList.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentItems = filteredList.slice(startIndex, endIndex);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
      };

      const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
      };


    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gaborder px-4 py-2 md:items-center">
                    <h1 className="text-2xl font-semibold">Why Choose Us</h1>
                </div>

                {/* Form */}
                <ChooseUsUI />

                {/* Table Actions */}
                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="flex justify-end mb-4">
                        <Link
                            to="/admin/choose_us/add"
                            className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <FaPlus /> Add New
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-4">
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="border px-4 py-2 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/10 hover:border-black">
                                Excel
                            </button>
                            <button className="border px-4 py-2 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/10 hover:border-black">
                                PDF
                            </button>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-sm">Search:</span>
                            <input
                                type="search"
                                className="border px-4 py-2 rounded-md w-full md:w-64 outline-none"
                                placeholder="Search by product name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-auto">
                        <table className="w-full text-sm text-left border rounded shadow bg-white">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="border px-4 py-2">#</th>
                                    <th className="border px-4 py-2">Image</th>
                                    <th className="border px-4 py-2">Title</th>
                                    <th className="border px-4 py-2">Subtitle</th>
                                    <th className="border px-4 py-2">Created Date</th>
                                    <th className="border px-4 py-2">Updated Date</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={item._id} className="border hover:bg-gray-50">
                                        <td className="border px-4 py-2">{startIndex + index + 1}</td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={item.whyChooseUsContentImage}
                                                alt="item"
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{item.title}</td>
                                        <td className="border px-4 py-2">{item.subTitle}</td>
                                        <td className="border px-3 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                                        <td className="border px-3 py-2">{new Date(item.updatedAt).toLocaleString()}</td>
                                        <td className="border px-4 py-2 text-white">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => navigate(`/admin/choose_us/${item._id}`)} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing {filteredList.length === 0 ? "0 to 0" : `${startIndex + 1} to ${Math.min(endIndex, filteredList.length)}`} of {filteredList.length} entries
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
                                disabled={currentPage === totalPages || totalPages === 0}
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
