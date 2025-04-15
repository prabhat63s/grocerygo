import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaUpDownLeftRight } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CommonLayout from '../../components/layout/CommonLayout';

export default function FAQs() {
    const initialFaqs = [
        {
            id: '1',
            title: 'What is Grocers App?',
            description:
                'Grocers App is a mobile application developed by Gravity Infotech to empower small shops...',
            createdAt: 'Aug 15, 2022 05:00 PM',
            updatedAt: 'May 20, 2024 12:13 PM',
        },
        {
            id: '2',
            title: 'Will this App white labeled for my store?',
            description:
                'Yes, Grocers App is for your business. You can put your banners and select the theme...',
            createdAt: 'Aug 15, 2022 05:00 PM',
            updatedAt: 'May 20, 2024 12:13 PM',
        },
        // Add more items as needed
    ];

    const [faqs, setFaqs] = useState(initialFaqs);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredFaqs = faqs.filter((faq) =>
        faq.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(faqs);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setFaqs(reordered);
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <ol className="text-2xl font-semibold flex gap-2 items-center">
                        <li>
                            <Link to="/faq">FAQs</Link>
                        </li>
                    </ol>
                    <Link
                        to="/faq/add"
                        className="bg-black text-white px-4 py-1.5 rounded hover:bg-black/70"
                    >
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
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="faqTable">
                                {(provided) => (
                                    <table
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="min-w-full text-sm border rounded"
                                    >
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border px-3 py-2"></th>
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
                                                <Draggable key={faq.id} draggableId={faq.id} index={startIndex + idx}>
                                                    {(provided) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                                        >
                                                            <td
                                                                {...provided.dragHandleProps}
                                                                className="border px-3 py-2 text-gray-500"
                                                            >
                                                                <FaUpDownLeftRight />
                                                            </td>
                                                            <td className="border px-3 py-2">{startIndex + idx + 1}</td>
                                                            <td className="border px-3 py-2">{faq.title}</td>
                                                            <td className="border px-3 py-2">{faq.description}</td>
                                                            <td className="border px-3 py-2">{faq.createdAt}</td>
                                                            <td className="border px-3 py-2">{faq.updatedAt}</td>
                                                            <td className="border px-3 py-2">
                                                                <div className="flex gap-2 text-white">
                                                                    <Link
                                                                        to={`/faq/${faq.id}`}
                                                                        className="bg-blue-600 p-1.5 rounded-md hover:bg-blue-800"
                                                                    >
                                                                        <FaEdit />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => alert('Delete clicked')}
                                                                        className="bg-red-500 p-1.5 rounded-md hover:bg-red-700"
                                                                    >
                                                                        <FaTrash />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    </table>
                                )}
                            </Droppable>
                        </DragDropContext>
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
