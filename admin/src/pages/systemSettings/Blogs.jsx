import React, { useState } from 'react';
import { FaEdit, FaTrash, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

const initialBlogs = [
  {
    id: '3',
    title: 'Addictive Appetizers: Sausage Cheese Balls',
    description: 'Lorem is dummy ipsum text. Lorem is dummy ipsum text...',
    image: 'https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/blog-800_400.svg',
    created: 'May 25, 2022 01:48 AM',
    updated: 'Jan 28, 2025 04:16 AM',
  },
  {
    id: '11',
    title: 'Traditional Soft Pretzels with Sweet Beer Cheese',
    description: 'Lorem is dummy ipsum text. Lorem is dummy ipsum text...',
    image: 'https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/blog-800_400.svg',
    created: 'Jul 01, 2022 05:41 PM',
    updated: 'Jan 28, 2025 04:16 AM',
  },
  // Add more blogs as needed...
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredBlogs.slice(startIndex, endIndex);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

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
          <Link to="/blogs/add" className="btn btn-primary px-4 py-2 bg-black text-white rounded hover:bg-neutral-700">
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
                  setCurrentPage(1); // Reset to page 1
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
                <tr
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="border px-3 py-2">{startIndex + index + 1}</td>
                  <td className="border px-3 py-2">
                    <img src={blog.image} alt="Blog" className="h-12 w-auto rounded" />
                  </td>
                  <td className="border px-3 py-2">{blog.title}</td>
                  <td className="border px-3 py-2 truncate max-w-sm">{blog.description}</td>
                  <td className="border px-3 py-2">{blog.created}</td>
                  <td className="border px-3 py-2">{blog.updated}</td>
                  <td className="border px-3 py-2">
                    <div className="flex gap-2">
                      <Link to={`/blogs/${blog.id}`} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
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
