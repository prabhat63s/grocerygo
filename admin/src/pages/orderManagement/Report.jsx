import React, { useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import { FaCheck, FaHourglassHalf, FaMoneyBill, FaRegFilePdf, FaShoppingCart } from 'react-icons/fa'
import { MdOutlineAccessTime, MdOutlineClose } from 'react-icons/md'
import { IoEye } from 'react-icons/io5'
import { IoMdPrint } from 'react-icons/io'



export default function Report() {
    const mockOrders = [
        {
            id: 1,
            orderNumber: "PITS1007",
            totalAmount: "166.20",
            paymentType: "COD",
            paymentStatus: "Unpaid",
            orderType: "Delivery",
            status: "Cancel",
            createdDate: "Mar 27, 2025 10:52 PM",
            updatedDate: "Mar 27, 2025 05:23 PM",
        },
        {
            id: 2,
            orderNumber: "PITS1006",
            totalAmount: "147.20",
            paymentType: "xendit",
            paymentStatus: "Paid",
            orderType: "Delivery",
            status: "Complete",
            createdDate: "Mar 04, 2025 10:11 AM",
            updatedDate: "Mar 04, 2025 04:49 AM",
        },
        {
            id: 3,
            orderNumber: "PITS1005",
            totalAmount: "278.00",
            paymentType: "COD",
            paymentStatus: "Unpaid",
            orderType: "Delivery",
            status: "Complete",
            createdDate: "Feb 28, 2025 05:23 PM",
            updatedDate: "Mar 02, 2025 09:48 PM",
        },
        {
            id: 4,
            orderNumber: "PITS1004",
            totalAmount: "166.20",
            paymentType: "COD",
            paymentStatus: "Unpaid",
            orderType: "Delivery",
            status: "Pending",
            createdDate: "Feb 19, 2025 12:16 AM",
            updatedDate: "Feb 19, 2025 12:16 AM",
        },
        {
            id: 5,
            orderNumber: "PITS1003",
            totalAmount: "147.20",
            paymentType: "COD",
            paymentStatus: "Unpaid",
            orderType: "Delivery",
            status: "Pending",
            createdDate: "Feb 18, 2025 06:30 AM",
            updatedDate: "Feb 18, 2025 06:30 AM",
        },
        {
            id: 6,
            orderNumber: "PITS1002",
            totalAmount: "47.20",
            paymentType: "Bank Transfer",
            paymentStatus: "Unpaid",
            orderType: "Takeaway",
            status: "Pending",
            createdDate: "Feb 16, 2025 07:50 AM",
            updatedDate: "Feb 16, 2025 07:50 AM",
        },
        {
            id: 7,
            orderNumber: "PITS1001",
            totalAmount: "166.20",
            paymentType: "COD",
            paymentStatus: "Unpaid",
            orderType: "Delivery",
            status: "Pending",
            createdDate: "Feb 09, 2025 07:03 PM",
            updatedDate: "Feb 09, 2025 07:03 PM",
        },
    ];

    const stats = [
        { icon: <FaShoppingCart />, label: 'Total Orders', value: 8, statusFilter: "All" },
        { icon: <FaHourglassHalf />, label: 'Processing', value: 4, statusFilter: "Pending" },
        { icon: <FaCheck />, label: 'Completed', value: 5, statusFilter: "Complete" },
        { icon: <MdOutlineClose />, label: 'Cancelled', value: 2, statusFilter: "Cancel" },
    ];

    const [searchTerm, setSearchTerm] = useState(""); // For search input filtering
    const [statusFilter, setStatusFilter] = useState("All"); // For filtering orders by status
    const [currentPage, setCurrentPage] = useState(1); // Track current pagination page
    const [form, setForm] = useState({
        customer_id: '',
        startdate: '',
        enddate: '',
    }); // Report form state

    // Handle form field changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Number of rows to display per page
    const rowsPerPage = 5;

    // Apply search and status filters to mockOrders
    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch = order.status.toLowerCase().includes(searchTerm.toLowerCase()); // Case-insensitive status search
        const matchesStatus = statusFilter === "All" || order.status === statusFilter; // Match selected status or allow all
        return matchesSearch && matchesStatus;
    });

    // Calculate pagination indices
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;

    // Get current page's orders to display
    const currentRows = filteredOrders.slice(indexOfFirst, indexOfLast);

    // Total number of pages based on filtered results
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

    const revenue = filteredOrders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);

    // Pagination: go to previous page
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Pagination: go to next page
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };


    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="">
                    <h1 className="text-2xl font-semibold">Report</h1>

                    <div className="flex justify-end gap-2">
                        <form className="my-6" >
                            <div className="flex flex-wrap items-end gap-3 justify-end">
                                {/* Customer Select */}
                                <div className="w-full sm:w-auto">
                                    <label className="block text-sm mb-1 text-gray-700">Select Customer</label>
                                    <select
                                        name="customer_id"
                                        value={form.customer_id}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="">Select Customer</option>
                                        <option value="3">User</option>
                                        <option value="4">test12414</option>
                                    </select>
                                </div>

                                {/* Start Date */}
                                <div className="w-full sm:w-auto">
                                    <label className="block text-sm mb-1 text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        name="startdate"
                                        value={form.startdate}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                {/* End Date */}
                                <div className="w-full sm:w-auto">
                                    <label className="block text-sm mb-1 text-gray-700">End Date</label>
                                    <input
                                        type="date"
                                        name="enddate"
                                        value={form.enddate}
                                        onChange={handleChange}
                                        required
                                        className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-md transition-all"
                                    >
                                        Fetch
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* filter tabs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setStatusFilter(item.statusFilter)}
                                className={`flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 p-4 rounded-lg shadow-sm transition-all border ${statusFilter === item.statusFilter ? "border-yellow-500" : "border-transparent"}`}
                            >
                                <div className="text-white bg-yellow-400 rounded-full p-2">
                                    {item.icon}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">{item.label}</p>
                                    <h2 className="text-xl font-medium">
                                        {item.currency && "₹"}{item.value}
                                    </h2>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 p-4 rounded-lg shadow-sm transition-all border">
                            <div className="text-white bg-yellow-400 rounded-full p-2"> <FaMoneyBill /></div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Revenue</p>
                                <h2 className="text-xl font-medium">₹{revenue}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* reports */}
                <div className="p-4 bg-white rounded-md shadow">
                    <div className="flex justify-between my-2">
                        <div className="flex gap-2">
                            <button
                                className="border hover:border-black py-2 px-4 rounded-md text-sm"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
                                }}
                            >
                                Excel
                            </button>
                            <button
                                className="border hover:border-black py-2 px-4 rounded-md text-sm"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
                                }}
                            >
                                PDF
                            </button>
                        </div>

                        <div className="flex items-center gap-1">
                            <p className="">Search:</p>
                            <input
                                type="search"
                                placeholder='Filter by status (e.g. "Cancel")'
                                className='border px-4 py-1 outline-none rounded-md'
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
                                    <th className="border px-4 py-2 text-left">Order Number</th>
                                    <th className="border px-4 py-2 text-left">Total Amount</th>
                                    <th className="border px-4 py-2 text-left">Payment Type</th>
                                    <th className="border px-4 py-2 text-left">Order Type</th>
                                    <th className="border px-4 py-2 text-left">Status</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((order, index) => (
                                        <tr key={order.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                            <td className="border px-4 py-2">
                                                {indexOfFirst + index + 1}
                                            </td>
                                            <td className="border px-4 py-2">{order.orderNumber}</td>
                                            <td className="border px-4 py-2">₹{order.totalAmount}</td>
                                            <td className="border px-4 py-2">{order.paymentType} <p className={`text-xs flex gap-1 items-center ${order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}> <MdOutlineAccessTime /> {order.paymentStatus}</p></td>
                                            <td className="border px-4 py-2">{order.orderType}</td>
                                            <td className="border px-4 py-2">
                                                <span
                                                    className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === "Cancel"
                                                        ? "bg-red-100 text-red-700"
                                                        : order.status === "Complete"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="border px-4 py-2">{order.createdDate}</td>
                                            <td className="border px-4 py-2">{order.updatedDate}</td>
                                            <td className="border px-4 py-2 text-white">
                                                <div className="flex items-center gap-2">
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded-md" title="View" > <IoEye size={16} /> </button>
                                                    <button className="bg-black hover:bg-gray-800 p-1.5 rounded-md" title="Download PDF"  > <FaRegFilePdf size={16} /> </button>
                                                    <button className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Print" > <IoMdPrint size={16} /> </button>
                                                    <button className="bg-yellow-500 hover:bg-yellow-400 p-1.5 rounded-md" title="Print" > <FaMoneyBill size={16} /> </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center py-6 text-gray-500">
                                            No data available in table
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing{" "}
                            {mockOrders.length === 0
                                ? "0 to 0"
                                : `${indexOfFirst + 1} to ${Math.min(
                                    indexOfLast,
                                    mockOrders.length
                                )}`}{" "}
                            of {mockOrders.length} entries
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
    )
}
