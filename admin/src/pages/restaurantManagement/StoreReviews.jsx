import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function StoreReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const reviews = [
    // Example dummy data
    {
      id: 1,
      image: '/img/user.png',
      name: 'John Doe',
      position: 'Manager',
      description: 'Great service and friendly staff!',
      rating: 4.5,
      createdDate: 'Jan 01, 2024',
      updatedDate: 'Feb 10, 2024'
    }
    // Add more items as needed
  ];

  const filtered = reviews.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentReviews = filtered.slice(indexOfFirst, indexOfLast);

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
          <h1 className="text-2xl font-semibold">Store Reviews</h1>
          <Link
            to="/admin/reviews/add"
            className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded"
          >
            <FaPlus /> Add New
          </Link>
        </div>

        <div className="p-4 bg-white rounded-md shadow">
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
                placeholder="Search by name"
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
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Position</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Rating</th>
                  <th className="border px-4 py-2">Created Date</th>
                  <th className="border px-4 py-2">Updated Date</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReviews.length > 0 ? (
                  currentReviews.map((review, index) => (
                    <tr key={review.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border px-4 py-2">{indexOfFirst + index + 1}</td>
                      <td className="border px-4 py-2">
                        <img src={review.image} alt="avatar" className="w-10 h-10 rounded-full" />
                      </td>
                      <td className="border px-4 py-2">{review.name}</td>
                      <td className="border px-4 py-2">{review.position}</td>
                      <td className="border px-4 py-2">{review.description}</td>
                      <td className="border px-4 py-2">{review.rating}</td>
                      <td className="border px-4 py-2">{review.createdDate}</td>
                      <td className="border px-4 py-2">{review.updatedDate}</td>
                      <td className="border px-4 py-2">
                        <div className="flex gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded" title="Edit">
                            <FaEdit />
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded" title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing {filtered.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filtered.length)}`} of {filtered.length} entries
            </div>
            <div className="space-x-2">
              <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
                Previous
              </button>
              <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
