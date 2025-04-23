import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { token } = useAuth();

  // --- Fetch from /api/contactus ---
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/blogs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle either an array or { data: [...] }
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch Blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  // --- Delete handler ---
  const handleDelete = async (id) => {
    if (!token) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/blogs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBlogs();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredBlogs.slice(startIndex, endIndex);

  console.log(currentItems)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <Link to="/admin/blogs/add" className="btn btn-primary px-4 py-2 bg-black text-white rounded hover:bg-neutral-700">
            + Add New
          </Link>
        </div>

        <div className="bg-white p-4 shadow rounded-md overflow-x-auto">
          <div className="flex justify-between flex-wrap gap-4 items-center mb-4">
            <div className="flex gap-2">
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
            </div>

            <div className="flex items-center gap-2">
              <span>Search:</span>
              <input
                type="search"
                className="border px-3 py-1 rounded w-full md:w-64"
                placeholder="Search by title"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="border px-3 py-2 w-8">#</th>
                <th className="border px-3 py-2 w-24">Image</th>
                <th className="border px-3 py-2">Title</th>
                <th className="border px-3 py-2">Description</th>
                <th className="border px-3 py-2">Created Date</th>
                <th className="border px-3 py-2">Updated Date</th>
                <th className="border px-3 py-2 w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((blog, index) => (
                <tr key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="border px-3 py-2">{startIndex + index + 1}</td>
                  <td className="border px-3 py-2">
                    <img src={blog.blogImage} alt="Blog" className="h-12 w-auto rounded" />
                  </td>
                  <td className="border px-3 py-2">{blog.title}</td>
                  <td className="border px-3 py-2 truncate max-w-sm">{blog.message}</td>
                  <td className="border px-3 py-2">{new Date(blog.createdAt || blog.created).toLocaleString()}</td>
                  <td className="border px-3 py-2">{new Date(blog.updatedAt || blog.updated).toLocaleString()}</td>
                  <td className="border px-3 py-2">
                    <div className="flex gap-2">
                      <Link to={`/admin/blogs/${blog._id}`} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing {filteredBlogs.length === 0 ? '0 to 0' : `${startIndex + 1} to ${Math.min(endIndex, filteredBlogs.length)}`} of {filteredBlogs.length} entries
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
