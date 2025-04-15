import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaCheck, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

export default function Customers() {
    const initialCustomers = [
        {
            id: '1',
            name: 'test12414',
            email: 'test-admin@mail.com',
            mobile: '02112408012',
            referralCode: 'aQlwZ0nM3F',
            loginWith: 'Email',
            verificationStatus: 'Verified',
            status: 'Active',
            createdDate: 'Feb 18, 2025 12:57 AM',
            updatedDate: 'Feb 18, 2025 12:57 AM',
        },
        {
            id: '2',
            name: 'User',
            email: 'user@yopmail.com',
            mobile: '96787686',
            referralCode: 'A5GCu1KnXw',
            loginWith: 'Email',
            verificationStatus: 'Verified',
            status: 'Active',
            createdDate: 'Jun 25, 2024 06:58 AM',
            updatedDate: 'Jan 21, 2025 04:43 AM',
        },
    ];

    const [customers, setCustomers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updated = [...customers];
        const sourceIndex = indexOfFirst + result.source.index;
        const destinationIndex = indexOfFirst + result.destination.index;
        const [removed] = updated.splice(sourceIndex, 1);
        updated.splice(destinationIndex, 0, removed);

        setCustomers(updated);
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Customers</h1>
                    <Link
                        to="/admin/users/add"
                        className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded"
                    >
                        <FaPlus /> Add New
                    </Link>
                </div>

                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                        <div className="flex w-full gap-2">
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                                Excel
                            </button>
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                                PDF
                            </button>
                        </div>
                        <div className="flex items-center justify-between md:justify-end w-full gap-1">
                            <span>Search:</span>
                            <input
                                type="search"
                                placeholder="Search by customer name"
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
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <table className="min-w-full text-sm border border-gray-200 rounded-md">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border px-4 py-2 text-left"></th>
                                        <th className="border px-4 py-2 text-left">#</th>
                                        <th className="border px-4 py-2 text-left">Name</th>
                                        <th className="border px-4 py-2 text-left">Email</th>
                                        <th className="border px-4 py-2 text-left">Mobile</th>
                                        <th className="border px-4 py-2 text-left">Referral Code</th>
                                        <th className="border px-4 py-2 text-left">Login With</th>
                                        <th className="border px-4 py-2 text-left">Verification</th>
                                        <th className="border px-4 py-2 text-left">Status</th>
                                        <th className="border px-4 py-2 text-left">Created Date</th>
                                        <th className="border px-4 py-2 text-left">Updated Date</th>
                                        <th className="border px-4 py-2 text-left">Action</th>
                                    </tr>
                                </thead>
                                <Droppable droppableId="customerTable">
                                    {(provided) => (
                                        <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                            {currentCustomers.map((customer, idx) => (
                                                <Draggable key={customer.id} draggableId={customer.id} index={idx}>
                                                    {(provided) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                                        >
                                                            <td className="border px-4 py-2 cursor-move text-gray-600" {...provided.dragHandleProps}>
                                                                <FaArrowsAlt />
                                                            </td>
                                                            <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                                            <td className="border px-4 py-2">{customer.name}</td>
                                                            <td className="border px-4 py-2">{customer.email}</td>
                                                            <td className="border px-4 py-2">{customer.mobile}</td>
                                                            <td className="border px-4 py-2">{customer.referralCode}</td>
                                                            <td className="border px-4 py-2">{customer.loginWith}</td>
                                                            <td className="border px-4 py-2">{customer.verificationStatus}</td>
                                                            <td className="border px-4 py-2">
                                                                {customer.status === "Active" ? <span className="bg-green-500 text-white text-xs inline-flex items-center justify-center p-1.5 rounded">
                                                                    <FaCheck className="text-sm" />
                                                                </span> : "-"}</td>
                                                            <td className="border px-4 py-2">{customer.createdDate}</td>
                                                            <td className="border px-4 py-2">{customer.updatedDate}</td>
                                                            <td className="border px-4 py-2 text-white">
                                                                <div className="flex items-center gap-2">
                                                                    <button className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                                        <FaEdit />
                                                                    </button>
                                                                    <button className="bg-black hover:bg-neutral-700 p-1.5 rounded-md" title="Edit">
                                                                        <FaEye />
                                                                    </button>
                                                                    <button className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
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
                                    )}
                                </Droppable>
                            </table>
                        </DragDropContext>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing {filteredCustomers.length === 0 ? "0 to 0" : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredCustomers.length)}`} of {filteredCustomers.length} entries
                        </div>
                        <div className="space-x-2">
                            <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
                            <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
