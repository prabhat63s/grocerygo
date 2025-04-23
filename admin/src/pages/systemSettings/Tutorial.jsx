import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Tutorial() {
  const [tutorials, setTutorials] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { token } = useAuth();

  // --- Fetch from /api/contactus ---
  const fetchTotorial = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tutorial`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle either an array or { data: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setTutorials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch tutorial:', error);
    }
  };

  useEffect(() => {
    fetchTotorial();
  }, [token]);

  // --- Delete handler ---
  const handleDelete = async (id) => {
    if (!token) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tutorial/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTotorial();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredTutorials = tutorials.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTutorials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTutorials.slice(startIndex, endIndex);


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <ol className="flex gap-1 items-center">
            <li><Link to="/admin/tutorial" className="text-2xl font-semibold">Tutorial</Link></li>
          </ol>
          <Link to="/admin/tutorial/add" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700 text-sm">
            + Add New
          </Link>
        </div>

        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded text-sm">
          <i className="fa-regular fa-circle-exclamation mr-2"></i>This section is available only for mobile applications
        </div>

        <div className="bg-white rounded shadow-md p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex gap-2">
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Search:</span>
              <input
                type="search"
                className="border px-3 py-1 rounded-md text-sm"
                placeholder="Search tutorials..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-3 py-2 text-left">#</th>
                  <th className="border px-3 py-2 text-left">Image</th>
                  <th className="border px-3 py-2 text-left">Title</th>
                  <th className="border px-3 py-2 text-left">Description</th>
                  <th className="border px-3 py-2 text-left">Created Date</th>
                  <th className="border px-3 py-2 text-left">Updated Date</th>
                  <th className="border px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border px-3 py-2">{startIndex + idx + 1}</td>
                      <td className="border px-3 py-2">
                        <img src={item.tutorialImage} alt={item.title} className="h-12 w-auto rounded" />
                      </td>
                      <td className="border px-3 py-2">{item.title}</td>
                      <td className="border px-3 py-2">{item.message}</td>
                      <td className="border px-3 py-2">{new Date(item.createdAt || item.created).toLocaleString()}</td>
                      <td className="border px-3 py-2">{new Date(item.updatedAt || item.updated).toLocaleString()}</td>
                      <td className="border px-3 py-2">
                        <div className="flex gap-2 text-white">
                          <Link to={`/admin/tutorial/${item._id}`} className="bg-blue-600 p-1.5 rounded-md hover:bg-blue-800">
                            <FaEdit />
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="bg-red-500 p-1.5 rounded-md hover:bg-red-700">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">No tutorials found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing {currentItems.length === 0 ? '0 to 0' : `${startIndex + 1} to ${Math.min(endIndex, filteredTutorials.length)}`} of {filteredTutorials.length} entries
            </div>
            <div className="space-x-2">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
