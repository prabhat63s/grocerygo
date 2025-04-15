import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import CommonLayout from '../../components/layout/CommonLayout';

export default function EmailSubscribers() {
    const initialSubscribers = [
        {
            id: 1,
            email: 'superadmin@your66fsafasf6fhgvsdfsgagsggsdgshdoddfemain.com',
            created: 'Feb 06, 2025 04:21 PM',
            updated: 'Feb 06, 2025 04:21 PM',
        },
        {
            id: 2,
            email: 'test@mailinator.com',
            created: 'Oct 29, 2024 04:48 AM',
            updated: 'Oct 29, 2024 04:48 AM',
        },
        // Add more mock data for testing pagination if needed
    ];

    const [subscribers, setSubscribers] = useState(initialSubscribers);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filtered = subscribers.filter((sub) =>
        sub.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filtered.slice(startIndex, endIndex);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this subscriber?')) {
            setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage => currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage => currentPage + 1);
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="text-2xl font-semibold">Email Subscribers</h1>
                </div>

                <div className="bg-white p-4 shadow rounded space-y-4">
                    <div className="flex justify-between flex-wrap gap-4 items-center">
                        <div className="flex gap-2">
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
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
                                    setCurrentPage(1); // reset to first page on search
                                }}
                            />
                        </div>
                    </div>

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
                                    <tr key={sub.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="border px-4 py-2">{startIndex + idx + 1}</td>
                                        <td className="border px-4 py-2">{sub.email}</td>
                                        <td className="border px-4 py-2">{sub.created}</td>
                                        <td className="border px-4 py-2">{sub.updated}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                                                title="Delete"
                                                onClick={() => handleDelete(sub.id)}
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

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing {filtered.length === 0 ? '0 to 0' : `${startIndex + 1} to ${Math.min(endIndex, filtered.length)}`} of {filtered.length} entries
                        </div>
                        <div className="space-x-2">
                            <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
