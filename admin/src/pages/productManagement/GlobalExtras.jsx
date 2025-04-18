import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function GlobalExtras() {
  const initialExtras = [
    {
      id: '1',
      name: 'Extra 2',
      price: '$20.00',
      status: 'active',
      createdDate: 'Jun 20, 2024 01:26 PM',
      updatedDate: 'Jan 27, 2025 11:37 PM'
    },
    {
      id: '2',
      name: 'Extra 1',
      price: '$10.00',
      status: 'active',
      createdDate: 'Jun 20, 2024 01:26 PM',
      updatedDate: 'Jan 27, 2025 11:37 PM'
    },
    {
      id: '3',
      name: 'Extra 3',
      price: '$30.00',
      status: 'active',
      createdDate: 'Jun 20, 2024 01:26 PM',
      updatedDate: 'Jan 27, 2025 11:37 PM'
    },
    {
      id: '4',
      name: 'Extra 4',
      price: '$40.00',
      status: 'active',
      createdDate: 'Jun 20, 2024 01:26 PM',
      updatedDate: 'Jan 27, 2025 11:37 PM'
    },
    {
      id: '5',
      name: 'Extra 5',
      price: '$50.00',
      status: 'active',
      createdDate: 'Jun 20, 2024 01:26 PM',
      updatedDate: 'Jan 27, 2025 11:37 PM'
    }
  ];

  const [extras, setExtras] = useState(initialExtras);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter taxes based on the tax name (search string is lowercased)
  const filteredTaxes = extras.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTaxes.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  // Only display rows on the current page
  const currentTaxes = filteredTaxes.slice(indexOfFirst, indexOfLast);

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
          <h1 className="text-2xl font-semibold">Global Extras</h1>
          <Link
            to='/admin/extras/add'
            className="px-5 flex gap-2 justify-center items-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded"
          >
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
                placeholder="Search by product name"
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
              <thead className="bg-gray-100 text-left text-sm font-medium">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Created Date</th>
                  <th className="border px-4 py-2">Updated Date</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentTaxes.map((tax, idx) => (

                  <tr
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                    <td className="border px-4 py-2">{tax.name}</td>
                    <td className="border px-4 py-2">{tax.price}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`text-white p-1.5 text-xs rounded-md inline-block ${tax.status === "active" ? "bg-green-500" : "bg-gray-400"
                          }`}
                      >
                        {tax.status === "active" ? <FaCheck /> : ""}
                      </span>
                    </td>
                    <td className="border px-4 py-2 md:w-32">{tax.createdDate}</td>
                    <td className="border px-4 py-2 md:w-32">{tax.updatedDate}</td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md text-white" title="Edit">
                          <FaEdit />
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md text-white" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>

                ))}
              </tbody>

            </table>
          </div>


          {/* Pagination Footer */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing{" "}
              {filteredTaxes.length === 0
                ? "0 to 0"
                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredTaxes.length)}`}{" "}
              of {filteredTaxes.length} entries
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
