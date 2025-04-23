import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import CommonLayout from '../../components/layout/CommonLayout';
import { useAuth } from '../../context/AuthContext';

export default function EmailSubscribers() {
    const { token } = useAuth();

    // --- State & pagination ---
    const [subscribers, setSubscribers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // --- Fetch from /api/newsletter ---
    const fetchSubscribers = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/newsletter`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSubscribers(res.data);
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, [token]);

    // --- Delete handler ---
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this subscriber?'))
            return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/newsletter/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchSubscribers();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    // --- Filtering & pagination logic ---
    const filteredSubscribers = subscribers.filter((sub) =>
        sub.email.toLowerCase().includes(search.toLowerCase())
    );


    const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredSubscribers.slice(startIndex, endIndex);

    console.log(currentItems)
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="text-2xl font-semibold">Email Subscribers</h1>
                </div>

                <div className="bg-white p-4 shadow rounded space-y-4">
                    {/* Export / Search */}
                    <div className="flex justify-between flex-wrap gap-4 items-center">
                        <div className="flex gap-2">
                            <button className="border py-2 px-4 rounded text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                                Excel
                            </button>
                            <button className="border py-2 px-4 rounded text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                                PDF
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Search:</span>
                            <input
                                type="search"
                                className="border px-3 py-1 rounded w-full md:w-64"
                                placeholder="Search by email"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200">
                            <thead className="bg-gray-50 font-semibold">
                                <tr>
                                    <th className="border px-4 py-2 text-left">#</th>
                                    <th className="border px-4 py-2 text-left">Email</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((sub, idx) => (
                                    <tr
                                        key={sub._id || sub.id}
                                        className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                    >
                                        <td className="border px-4 py-2">{startIndex + idx + 1}</td>
                                        <td className="border px-4 py-2">{sub.email}</td>
                                        <td className="border px-4 py-2">
                                            {new Date(sub.createdAt || sub.created).toLocaleString()}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {new Date(sub.updatedAt || sub.updated).toLocaleString()}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                                                title="Delete"
                                                onClick={() => handleDelete(sub._id || sub.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-gray-500">
                                            No email subscribers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing{' '}
                            {filteredSubscribers.length === 0
                                ? '0 to 0'
                                : `${startIndex + 1} to ${Math.min(
                                    endIndex,
                                    filteredSubscribers.length
                                )}`}{' '}
                            of {filteredSubscribers.length} entries
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextPage}
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
