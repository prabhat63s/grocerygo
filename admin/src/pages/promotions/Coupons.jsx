import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Coupons() {
    const initialCoupons = [
        {
            id: '1',
            title: 'Every Friday 20% Discounts',
            couponCode: 'FRD20',
            discount: '20%',
            status: 'active',
            createdDate: 'May 20, 2024 10:26 AM',
            updatedDate: 'Jan 28, 2025 12:19 AM'
        },
        {
            id: '2',
            title: 'First Grocery Online Order 25% Off',
            couponCode: 'FIRST25',
            discount: '25%',
            status: 'active',
            createdDate: 'Jun 14, 2024 09:39 AM',
            updatedDate: 'Jan 28, 2025 12:19 AM'
        },
        {
            id: '3',
            title: 'Unlock The Magic 50% Offer',
            couponCode: 'MEGA30',
            discount: '50%',
            status: 'active',
            createdDate: 'Jun 10, 2024 09:59 AM',
            updatedDate: 'Jan 28, 2025 12:19 AM'
        },
        {
            id: '4',
            title: 'Excellent Offer For Shop',
            couponCode: 'OFF10',
            discount: '10%',
            status: 'active',
            createdDate: 'Aug 25, 2022 07:34 PM',
            updatedDate: 'Jan 28, 2025 12:19 AM'
        }
    ];

    const [coupons, setCoupons] = useState(initialCoupons);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredCoupons = coupons.filter(coupon =>
        coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentCoupons = filteredCoupons.slice(indexOfFirst, indexOfLast);

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
                    <h1 className="text-2xl font-semibold">Coupons</h1>
                    <Link to='/admin/promocode/add' className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
                        <FaPlus /> Add New
                    </Link>
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
                                placeholder="Search by title"
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
                                    <th className="border px-4 py-2 text-left">Title</th>
                                    <th className="border px-4 py-2 text-left">Coupon Code</th>
                                    <th className="border px-4 py-2 text-left">Discount</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>

                            <tbody
                            >
                                {currentCoupons.map((coupon, idx) => (
                                    <tr
                                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                    >
                                        <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-4 py-2">{coupon.title}</td>
                                        <td className="border px-4 py-2">{coupon.couponCode}</td>
                                        <td className="border px-4 py-2">{coupon.discount}</td>
                                        <td className="border px-4 py-2">
                                            <span className="bg-green-500 text-white text-xs inline-flex items-center justify-center p-1.5 rounded">
                                                <FaCheck className="text-sm" />
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2">{coupon.createdDate}</td>
                                        <td className="border px-4 py-2">{coupon.updatedDate}</td>
                                        <td className="border px-4 py-2 text-white">
                                            <div className="flex items-center gap-2">
                                                <Link to={`/admin/coupon-${coupon.id}`} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                    <FaEdit />
                                                </Link>
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
                            Showing{" "}
                            {filteredCoupons.length === 0
                                ? "0 to 0"
                                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredCoupons.length)}`}{" "}
                            of {filteredCoupons.length} entries
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
