import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import CommonLayout from '../../components/layout/CommonLayout';
import axios from 'axios';

export default function FAQs() {
    const [faqs, setFaqs] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/faq/all`);
                setFaqs(res.data);
            } catch (err) {
                console.error("Failed to fetch FAQs", err);
            }
        };
        fetchFaqs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this FAQ?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/faq/${id}`);
                setFaqs(faqs.filter(faq => faq._id !== id));
            } catch (err) {
                console.error("Failed to delete FAQ", err);
            }
        }
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <ol className="text-2xl font-semibold flex gap-2 items-center">
                        <li><Link to="/faq">FAQs</Link></li>
                    </ol>
                    <Link to="/admin/faq/add" className="bg-black text-white px-4 py-1.5 rounded hover:bg-black/70">
                        <i className="fa-regular fa-plus mr-2"></i> Add New
                    </Link>
                </div>

                <div className="bg-white p-4 rounded shadow space-y-4">
                    <div className="flex justify-between flex-wrap gap-3 items-center">
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Excel</button>
                            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">PDF</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Search:</span>
                            <input
                                type="search"
                                placeholder="Search..."
                                className="border px-3 py-1 rounded text-sm"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border rounded">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border px-3 py-2">#</th>
                                    <th className="border px-3 py-2">Title</th>
                                    <th className="border px-3 py-2">Description</th>
                                    <th className="border px-3 py-2">Created Date</th>
                                    <th className="border px-3 py-2">Updated Date</th>
                                    <th className="border px-3 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentFaqs.map((faq, idx) => (
                                    <tr key={faq._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="border px-3 py-2">{startIndex + idx + 1}</td>
                                        <td className="border px-3 py-2">{faq.title}</td>
                                        <td className="border px-3 py-2">{faq.description}</td>
                                        <td className="border px-3 py-2">{new Date(faq.createdAt).toLocaleString()}</td>
                                        <td className="border px-3 py-2">{new Date(faq.updatedAt).toLocaleString()}</td>
                                        <td className="border px-3 py-2">
                                            <div className="flex gap-2 text-white">
                                                <Link
                                                    to={`/admin/faq/${faq._id}`}
                                                    className="bg-blue-600 p-1.5 rounded-md hover:bg-blue-800"
                                                >
                                                    <FaEdit />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(faq._id)}
                                                    className="bg-red-500 p-1.5 rounded-md hover:bg-red-700"
                                                >
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
                            Showing{' '}
                            {filteredFaqs.length === 0
                                ? '0 to 0'
                                : `${startIndex + 1} to ${Math.min(endIndex, filteredFaqs.length)}`}{' '}
                            of {filteredFaqs.length} entries
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
