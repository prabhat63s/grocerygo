import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function EmployeeRoles() {
    const initialRoles = [
        {
            id: '1',
            roleName: 'Manager',
            modules: [
                'role_dashboard', 'role_pos', 'role_orders', 'role_report', 'role_categories',
                'role_subcategories', 'role_tax', 'role_global_extras', 'role_items',
                'role_product_reviews', 'role_import_products', 'role_shopify', 'role_sliders',
                'role_banner', 'role_promocode', 'role_firebase', 'role_top_deals',
                'role_working_hours', 'role_custom_status', 'role_payment_methods',
                'role_testimonials', 'role_inquiries', 'role_choose_us', 'role_customers',
                'role_drivers', 'role_roles', 'role_employees', 'role_cms_pages', 'role_blogs',
                'role_our_team', 'role_tutorial', 'role_faq', 'role_gallery',
                'role_email_subscriber', 'role_settings', 'role_whatsapp_settings',
                'role_share', 'role_language_settings', 'role_addons_manager', 'role_clear_cache',
            ],
            status: 'Active',
            createdDate: 'Jan 22, 2025 04:43 AM',
            updatedDate: 'Jan 22, 2025 04:55 AM',
        },
    ];

    const [roles, setRoles] = useState(initialRoles);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredRoles = roles.filter(role =>
        role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRoles.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRoles = filteredRoles.slice(indexOfFirst, indexOfLast);

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
                    <h1 className="text-2xl font-semibold">Employee Roles</h1>
                    <Link to="/admin/roles/add" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700 flex items-center gap-2">
                        <FaPlus /> Add New
                    </Link>
                </div>

                <div className="p-4 bg-white rounded-md shadow space-y-4">
                    <div className="flex justify-between flex-wrap gap-3 items-center">
                        <div className="flex gap-2">
                            <button className="border px-4 py-2 rounded bg-gray-100 hover:border-black text-sm">Excel</button>
                            <button className="border px-4 py-2 rounded bg-gray-100 hover:border-black text-sm">PDF</button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>Search:</span>
                            <input
                                type="search"
                                className="border px-4 py-1 rounded"
                                placeholder="Search by role name"
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
                                    <th className="border px-4 py-2 text-left">#</th>
                                    <th className="border px-4 py-2 text-left">Role Name</th>
                                    <th className="border px-4 py-2 text-left">System Modules</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRoles.map((role, idx) => (
                                    <tr
                                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                    >
                                        <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-4 py-2">{role.roleName}</td>
                                        <td className="border px-4 py-2 whitespace-normal">
                                            <div className="flex flex-wrap gap-1">
                                                {role.modules.map((mod, i) => (
                                                    <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                                                        {mod}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="border px-4 py-2">
                                            {role.status === 'Active' ? (
                                                <span className="bg-green-500 text-white text-xs p-1.5 rounded inline-flex items-center">
                                                    <FaCheck className="text-sm" />
                                                </span>
                                            ) : '-'}
                                        </td>
                                        <td className="border px-4 py-2">{role.createdDate}</td>
                                        <td className="border px-4 py-2">{role.updatedDate}</td>
                                        <td className="border px-4 py-2">
                                            <div className="flex gap-2">
                                                <Link to={`/admin/roles/edit/${role.id}`} className="bg-blue-500 text-white p-1.5 rounded hover:bg-blue-600" title="Edit">
                                                    <FaEdit />
                                                </Link>
                                                <Link to={`/admin/roles/view/${role.id}`} className="bg-black text-white p-1.5 rounded hover:bg-neutral-700" title="View">
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

                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div>
                            Showing {filteredRoles.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredRoles.length)}`} of {filteredRoles.length} entries
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
