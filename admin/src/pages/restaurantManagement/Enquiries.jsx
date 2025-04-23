import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Enquiries() {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  console.log(enquiries)

  // --- Fetch from /api/contactus ---
  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/contactus`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle either an array or { data: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [token]);

  // --- Delete handler ---
  const handleDelete = async (id) => {
    if (!token) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/contactus/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEnquiries();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // --- Filtering & Pagination ---
  const filtered = enquiries.filter(e =>
    e.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentEnquiries = filtered.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold">Enquiries</h1>

        <div className="p-4 bg-white rounded-md shadow">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="flex w-full gap-2">
              <button disabled title="Coming soon" className="border px-4 py-2 rounded-md text-sm bg-gray-100">
                Excel
              </button>
              <button disabled title="Coming soon" className="border px-4 py-2 rounded-md text-sm bg-gray-100">
                PDF
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span>Search:</span>
              <input
                type="search"
                placeholder="Search by name"
                className="border px-4 py-1 rounded-md outline-none"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Created</th>
                  <th className="border px-4 py-2">Updated</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEnquiries.length > 0 ? (
                  currentEnquiries.map((item, idx) => (
                    <tr key={item._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                      <td className="border px-4 py-2">{item.fullName}</td>
                      <td className="border px-4 py-2">{item.email}</td>
                      <td className="border px-4 py-2 max-w-xs break-words">{item.message}</td>
                      <td className="border px-4 py-2">
                        {new Date(item.createdAt || item.created).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(item.updatedAt || item.updated).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing {filtered.length === 0
                ? '0 to 0'
                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filtered.length)}`} of {filtered.length} entries
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
