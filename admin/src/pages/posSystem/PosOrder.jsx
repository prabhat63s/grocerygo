import React, { useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import { FaCheck, FaHourglassHalf, FaMoneyBill, FaRegFilePdf, FaShoppingCart } from 'react-icons/fa'
import { MdOutlineAccessTime, MdOutlineClose } from 'react-icons/md'
import { IoEye } from 'react-icons/io5'
import { IoMdPrint } from 'react-icons/io'

export default function PosOrder() {
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
    // Add more mock data as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filtered orders based on search term (case-insensitive)
  const filteredOrders = mockOrders.filter(order =>
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredOrders.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold">POS Orders</h1>

        <div className="p-4 bg-white rounded-md shadow">
          {/* Export + Search */}
          <div className="flex justify-between my-2">
            <div className="flex gap-2">
              <button className="border hover:border-black py-2 px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-gray-200">Excel</button>
              <button className="border hover:border-black py-2 px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-gray-200">PDF</button>
            </div>
            <div className="flex items-center gap-2">
              <p>Search:</p>
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

          {/* Table */}
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
                      <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                      <td className="border px-4 py-2">{order.orderNumber}</td>
                      <td className="border px-4 py-2">₹{order.totalAmount}</td>
                      <td className="border px-4 py-2">
                        {order.paymentType}
                        <p className={`text-xs flex gap-1 items-center ${order.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}>
                          <MdOutlineAccessTime /> {order.paymentStatus}
                        </p>
                      </td>
                      <td className="border px-4 py-2">{order.orderType}</td>
                      <td className="border px-4 py-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full
                          ${order.status === "Cancel"
                            ? "bg-red-100 text-red-700"
                            : order.status === "Complete"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="border px-4 py-2">{order.createdDate}</td>
                      <td className="border px-4 py-2">{order.updatedDate}</td>
                      <td className="border px-4 py-2 text-white">
                        <div className="flex items-center gap-2">
                          <button className="bg-yellow-500 hover:bg-yellow-600 p-1.5 rounded-md" title="View"><IoEye size={16} /></button>
                          <button className="bg-black hover:bg-gray-800 p-1.5 rounded-md" title="Download PDF"><FaRegFilePdf size={16} /></button>
                          <button className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Print"><IoMdPrint size={16} /></button>
                          <button className="bg-yellow-500 hover:bg-yellow-400 p-1.5 rounded-md" title="Pay"><FaMoneyBill size={16} /></button>
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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing{" "}
              {filteredOrders.length === 0
                ? "0 to 0"
                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredOrders.length)}`}{" "}
              of {filteredOrders.length} entries
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
