import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaX } from 'react-icons/fa6';

export default function Banner() {
  const { type } = useParams();
  const { token } = useAuth();

  const [banners, setBanners] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch banners dynamically based on the `id` in the URL
  const fetchBanner = async () => {
    if (!token || !type) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/banner?type=${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('API Response:', res.data);
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setBanners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch banner:', error);
    }
  };


  useEffect(() => {
    fetchBanner();
  }, [token, type]);  // Re-fetch when token or id changes

  // --- Delete handler ---
  const handleDelete = async (bannerId) => {
    if (!token) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/banner/${bannerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBanner();  // Re-fetch after delete
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  // toggle status of a category
  const handleToggleStatus = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/banner/${id}/toggle-status`);

      fetchBanner();
    } catch (err) {
      console.error("Status toggle failed:", err);
    }
  };

  const filteredBanners = searchText
    ? banners.filter((banner) => {
      const search = searchText.toLowerCase();
      return (
        banner.product?.name?.toLowerCase().includes(search) ||
        banner.category?.name?.toLowerCase().includes(search)
      );
    })
    : banners;


  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = filteredBanners.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            {type
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>
          <Link to={`/admin/${type}/add`} className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
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
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
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
                  <th className="border px-4 py-2 text-left">Image</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                  <th className="border px-4 py-2 text-left">Product</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Created Date</th>
                  <th className="border px-4 py-2 text-left">Updated Date</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBanners.map((banner, index) => (
                  <tr
                    key={banner._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    <td className="border px-4 py-2">{startIndex + index + 1}</td>
                    <td className="border px-4 py-2">
                      <img src={banner.bannerImage} alt="Banner" className="h-12 rounded" />
                    </td>
                    <td className="border px-4 py-2">{banner.category?.name || '—'}</td>
                    <td className="border px-4 py-2">{banner.product?.name || '—'}</td>
                    <td className="border px-4 py-2">
                      <span
                        onClick={() => handleToggleStatus(banner._id)}
                        className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${banner.status ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {banner.status ? <FaCheck /> : <FaX />}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{new Date(banner.createdAt).toLocaleString()}</td>
                    <td className="border px-4 py-2">{new Date(banner.updatedAt).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-white">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/${type}/${banner._id}`}
                          className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing {filteredBanners.length === 0 ? "0 to 0" : `${startIndex + 1} to ${Math.min(endIndex, filteredBanners.length)}`} of {filteredBanners.length} entries
            </div>
            <div className="space-x-2">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
