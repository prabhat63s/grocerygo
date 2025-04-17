import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaEye } from 'react-icons/fa';

export default function EmployeeList() {
    const initialEmployees = [
        {
            id: '1',
            image: '/img/user.png',
            role: 'Manager',
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '9876543210',
            status: 'Active',
            createdDate: 'Jan 22, 2025 04:43 AM',
            updatedDate: 'Jan 22, 2025 04:55 AM',
        },
    ];

    const [employees, setEmployees] = useState(initialEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="text-2xl font-semibold">Employee</h1>
                    <Link to="/admin/employees/add" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700 flex items-center gap-2">
                        <FaPlus /> Add New
                    </Link>
                </div>

                <div className="p-4 bg-white rounded-md shadow">
                    <div className="flex justify-between flex-wrap gap-4 items-center mb-4">
                        <div className="flex gap-2">
                            <button className="border px-4 py-2 rounded bg-gray-100 hover:border-black text-sm">Excel</button>
                            <button className="border px-4 py-2 rounded bg-gray-100 hover:border-black text-sm">PDF</button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>Search:</span>
                            <input
                                type="search"
                                className="border px-4 py-1 rounded"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border px-3 py-2 text-left">#</th>
                                    <th className="border px-3 py-2 text-left">Image</th>
                                    <th className="border px-3 py-2 text-left">Role</th>
                                    <th className="border px-3 py-2 text-left">Name</th>
                                    <th className="border px-3 py-2 text-left">Email</th>
                                    <th className="border px-3 py-2 text-left">Mobile</th>
                                    <th className="border px-3 py-2 text-left">Status</th>
                                    <th className="border px-3 py-2 text-left">Created Date</th>
                                    <th className="border px-3 py-2 text-left">Updated Date</th>
                                    <th className="border px-3 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmployees.map((emp, idx) => (
                                    <tr
                                        className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
                                    >
                                        <td className="border px-3 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-3 py-2">
                                            {emp.image ? (
                                                <img src={emp.image} alt="Employee" className="h-10 w-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-10 w-10 bg-gray-300 rounded-full" />
                                            )}
                                        </td>
                                        <td className="border px-3 py-2">{emp.role}</td>
                                        <td className="border px-3 py-2">{emp.name}</td>
                                        <td className="border px-3 py-2">{emp.email}</td>
                                        <td className="border px-3 py-2">{emp.mobile}</td>
                                        <td className="border px-3 py-2">
                                            {emp.status === 'Active' ? (
                                                <span className="bg-green-500 text-white text-xs p-1.5 rounded inline-flex items-center">
                                                    <FaCheck className="text-sm" />
                                                </span>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td className="border px-3 py-2">{emp.createdDate}</td>
                                        <td className="border px-3 py-2">{emp.updatedDate}</td>
                                        <td className="border px-3 py-2">
                                            <div className="flex gap-2">
                                                <Link to={`/admin/employees/edit/${emp.id}`} className="bg-blue-500 text-white p-1.5 rounded hover:bg-blue-600" title="Edit">
                                                    <FaEdit />
                                                </Link>
                                                <Link to={`/admin/employees/view/${emp.id}`} className="bg-black text-white p-1.5 rounded hover:bg-neutral-700" title="View">
                                                    <FaEye />
                                                </Link>
                                                <button className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600" title="Delete">
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
                            Showing {filteredEmployees.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredEmployees.length)}`} of {filteredEmployees.length} entries
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
