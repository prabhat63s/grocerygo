import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';

export default function ProductReviews() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([]);

  return (
    <CommonLayout>
      <div className="p-5 space-y-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">Product Reviews</h1>
        </div>

        <div className="mb-4">
          <label htmlFor="item_name" className="block font-medium">
            Product Name
          </label>
          <select
            id="item_name"
            name="item_name"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="mt-2 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
          >
            <option value="">Select</option>
          </select>
        </div>

        <div className="bg-white rounded shadow">
          <div className="p-4">
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
                    // setCurrentPage(1);
                  }}
                />

              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2 font-medium border">#</th>
                    <th className="p-2 font-medium border">Product Name</th>
                    <th className="p-2 font-medium border">Rating</th>
                    <th className="p-2 font-medium border">Reviews</th>
                    <th className="p-2 font-medium border">Status</th>
                    <th className="p-2 font-medium border">Created Date</th>
                    <th className="p-2 font-medium border">Updated Date</th>
                    <th className="p-2 font-medium border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center p-4">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    reviews.map((review, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{review.productName}</td>
                        <td className="p-2 border">{review.rating}</td>
                        <td className="p-2 border">{review.reviewText}</td>
                        <td className="p-2 border">{review.status}</td>
                        <td className="p-2 border">{review.createdDate}</td>
                        <td className="p-2 border">{review.updatedDate}</td>
                        <td className="p-2 border">Edit | Delete</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <span>Showing 0 to 0 of 0 entries</span>
              <div className="space-x-2">
                <button className="px-3 py-1 border rounded bg-gray-200" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 border rounded bg-gray-200" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <form id="filter_review">
          <input type="hidden" name="item_id" id="sorter_item_name" value={selectedProduct} />
        </form>
      </div>
    </CommonLayout>
  );
}