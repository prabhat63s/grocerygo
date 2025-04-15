import React, { useState } from 'react'
import CommonLayout from '../components/layout/CommonLayout'
import { FaCalculator, FaList, FaMoneyBill, FaMotorcycle, FaRegFilePdf, FaRupeeSign, FaShoppingBasket, FaShoppingCart, FaStar, FaUsers } from 'react-icons/fa'
import EarningsChart from '../components/charts/EarningsChart'
import CustomersChart from '../components/charts/CustomersChart'
import { MdOutlineAccessTime } from 'react-icons/md'
import { IoEye } from 'react-icons/io5'
import { IoMdPrint } from 'react-icons/io'
import OrdersOverview from '../components/charts/OrdersOverview '

const stats = [
    { icon: <FaList />, label: 'Categories', value: 10 },
    { icon: <FaShoppingBasket />, label: 'Products', value: 29 },
    { icon: <FaUsers />, label: 'Customers', value: 2 },
    { icon: <FaMotorcycle />, label: 'Delivery Man', value: 1 },
    { icon: <FaShoppingCart />, label: 'Total Orders', value: 8 },
    { icon: <FaStar />, label: 'Store Reviews', value: 0 },
    { icon: <FaRupeeSign />, label: 'Earnings', value: '1,143.20', currency: true },
    { icon: <FaCalculator />, label: 'Tax', value: '57.60', currency: true },
]

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

const products = [
    {
        image: "/img/bread.jpg",
        name: "Baked Whole Wheat Sandwich Bread (Crustless)",
        category: "Bread & Bakery",
        orders: 37.5,
        color: "bg-blue-600",
    },
    {
        image: "/img/chicken.jpeg",
        name: "Meatzza Fresh Chicken Wings (Frozen)",
        category: "Meat",
        orders: 25,
        color: "bg-orange-400",
    },
    {
        image: "/img/onion.png",
        name: "Onion",
        category: "Vegetables",
        orders: 12.5,
        color: "bg-red-400",
    },
    {
        image: "/img/lays.jpg",
        name: "Lay's India's Magic Masala Potato Chips (40 g)",
        category: "Snacks",
        orders: 12.5,
        color: "bg-pink-400",
    },
];

const users = [
    {
        avatar: "/img/user.png",
        name: "test12414",
        email: "test-admin@mail.com",
        phone: "02112408012",
        orders: 12.5,
        color: "bg-green-500",
    },
];

export default function DashboardPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentRows = mockOrders.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(mockOrders.length / rowsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };


    const ProgressBar = ({ percentage, color }) => (
        <div className="w-full h-2 bg-gray-200 rounded">
            <div
                className={`h-full ${color} rounded`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                {/* Dashboard welcome */}
                <div className="rounded-lg">
                    <h1 className="text-2xl font-semibold">Welcome To GroceryGo</h1>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-white hover:bg-gray-50 p-4 rounded-lg shadow-sm transition-all"
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
                    </div>
                </div>
                {/* charts */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/3">
                        <CustomersChart />
                    </div>
                    <div className="w-full md:w-2/3">
                        <EarningsChart />
                    </div>
                </div>

                {/* todays order */}
                <div className="p-4 bg-white rounded-md shadow">
                    <div className="border-b pb-2">
                        <h2 className="text-xl font-semibold">Today's Orders</h2>
                    </div>

                    <div className="flex gap-2 justify-end my-2">
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

                {/* Top Products And Users */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-md shadow">
                        <div className="border-b pb-2">
                            <h2 className="text-xl font-semibold">Top Products</h2>
                        </div>

                        <div className="mt-2">
                            <table className="min-w-full bg-white border-b">
                                <thead className="text-sm font-normal text-gray-950">
                                    <tr>
                                        <th className="text-left py-2 px-4 border-b">Image</th>
                                        <th className="text-left py-2 px-4 border-b">Product Name</th>
                                        <th className="text-left py-2 px-4 border-b">Category</th>
                                        <th className="text-left py-2 px-4 border-b">Orders</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index} className="hover:bg-gray-50 text-sm">
                                             <td className="py-2 px-4 border-b"><img src={product.image} className='h-10 rounded-md' alt="" /></td>
                                            <td className="py-2 px-4 border-b ">{product.name}</td>
                                            <td className="py-2 px-4 border-b">{product.category}</td>
                                            <td className="py-2 px-4 border-b">{product.orders}
                                                <ProgressBar percentage={product.orders} color={product.color} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-md shadow">
                        <div className="border-b pb-2">
                            <h2 className="text-xl font-semibold">Top Users</h2>
                        </div>
                        <div className="mt-2">
                            <table className="min-w-full bg-white border-b">
                                <thead className="text-sm font-normal text-gray-950">
                                    <tr>
                                        <th className="text-left py-2 px-4 border-b">Image</th>
                                        <th className="text-left py-2 px-4 border-b">Customer Info</th>
                                        <th className="text-left py-2 px-4 border-b">Orders</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index} className="hover:bg-gray-50 text-sm">
                                            <td className="py-2 px-4 border-b"><img src={user.avatar} className='h-10' alt="" /></td>
                                            <td className="py-2 px-4 border-b">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-gray-600 text-xs">{user.email}</div>
                                                <div className="text-gray-500 text-xs">{user.phone}</div>
                                            </td>
                                            <td className="py-2 px-4 border-b w-48">
                                                <div className="text-sm font-medium text-gray-700">{user.orders}%</div>
                                                <ProgressBar percentage={user.orders} color={user.color} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Orders Overview */}
                <OrdersOverview />
            </div>
        </CommonLayout>
    )
}
