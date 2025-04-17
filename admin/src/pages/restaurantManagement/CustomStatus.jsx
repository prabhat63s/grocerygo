import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CustomStatus() {
    const initialCustomStatuses = [
        { id: '1', orderType: 'Takeaway', statusType: 'Default', name: 'Pending', status: '-', createdDate: 'Dec 26, 2023 05:26 AM', updatedDate: 'Jan 28, 2025 12:21 AM' },
        { id: '2', orderType: 'POS', statusType: 'Default', name: 'Pending', status: '-', createdDate: 'Dec 26, 2023 05:28 AM', updatedDate: 'Jan 21, 2025 06:03 AM' },
        { id: '3', orderType: 'Delivery', statusType: 'Process', name: 'On the Process', status: '', createdDate: 'Jun 08, 2024 11:29 AM', updatedDate: 'Jun 12, 2024 05:39 AM' },
        { id: '4', orderType: 'Delivery', statusType: 'Process', name: 'Pending', status: '', createdDate: 'Dec 26, 2023 05:25 AM', updatedDate: 'Jul 29, 2024 06:22 AM' },
        { id: '5', orderType: 'Takeaway', statusType: 'Process', name: 'Accepted', status: '', createdDate: 'Dec 26, 2023 05:26 AM', updatedDate: 'Jan 28, 2025 12:21 AM' },
        { id: '6', orderType: 'POS', statusType: 'Process', name: 'On the process', status: '', createdDate: 'Jan 21, 2025 06:02 AM', updatedDate: 'Jan 21, 2025 06:03 AM' },
        { id: '7', orderType: 'Delivery', statusType: 'Cancel', name: 'Cancel', status: '-', createdDate: 'Dec 26, 2023 05:26 AM', updatedDate: 'Jun 12, 2024 05:39 AM' },
        { id: '8', orderType: 'Takeaway', statusType: 'Process', name: 'Waiting For Pickup', status: '', createdDate: 'Dec 26, 2023 05:27 AM', updatedDate: 'Jan 28, 2025 12:21 AM' },
        { id: '9', orderType: 'POS', statusType: 'Complete', name: 'Complete', status: '-', createdDate: 'Dec 26, 2023 05:29 AM', updatedDate: 'Jan 21, 2025 06:03 AM' },
        { id: '10', orderType: 'Delivery', statusType: 'Complete', name: 'Complete', status: '-', createdDate: 'Dec 26, 2023 05:26 AM', updatedDate: 'Jun 12, 2024 05:39 AM' }
    ];

    const [customStatuses, setCustomStatuses] = useState(initialCustomStatuses);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredStatuses = customStatuses.filter(status =>
        status.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredStatuses.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentStatuses = filteredStatuses.slice(indexOfFirst, indexOfLast);

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
                    <h1 className="text-2xl font-semibold">Custom Status</h1>
                    <Link to='/admin/custom_status/add' className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
                        <FaPlus /> Add New
                    </Link>
                </div>

                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                        <div className="flex w-full gap-2">
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
                        </div>
                        <div className="flex items-center justify-between md:justify-end w-full gap-1">
                            <span>Search:</span>
                            <input
                                type="search"
                                placeholder="Search by status name"
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
                                    <th className="border px-4 py-2 text-left">Order Type</th>
                                    <th className="border px-4 py-2 text-left">Status Type</th>
                                    <th className="border px-4 py-2 text-left">Name</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {currentStatuses.map((item, idx) => (
                                    <tr
                                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                    >

                                        <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-4 py-2">{item.orderType}</td>
                                        <td className="border px-4 py-2">{item.statusType}</td>
                                        <td className="border px-4 py-2">{item.name}</td>
                                        <td className="border px-4 py-2">
                                            {item.status === "" ? <span className="bg-green-500 text-white text-xs inline-flex items-center justify-center p-1.5 rounded">
                                                <FaCheck className="text-sm" />
                                            </span> : "-"}
                                        </td>
                                        <td className="border px-4 py-2 md:w-32">{item.createdDate}</td>
                                        <td className="border px-4 py-2 md:w-32">{item.updatedDate}</td>
                                        <td className="border px-4 py-2 text-white">
                                            <div className="flex items-center gap-2">
                                                <button className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                    <FaEdit />
                                                </button>
                                                <button className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
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
                            Showing {filteredStatuses.length === 0 ? "0 to 0" : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredStatuses.length)}`} of {filteredStatuses.length} entries
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
