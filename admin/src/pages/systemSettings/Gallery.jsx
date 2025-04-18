import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const { token } = useAuth();

  // Fetch galleries from the server
  const fetchGalleries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/gallery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGalleryItems(res.data);
    } catch (error) {
      console.error('Failed to fetch galleries:', error);
    }
  };

  // Handle delete gallery item
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/gallery/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchGalleries();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Delete failed!');
      }
    }
  };

  // Run fetchGalleries on component mount
  useEffect(() => {
    fetchGalleries();
  }, [token]);

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <Link to="/admin/gallery/add" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700 flex items-center gap-2">
            <FaPlus /> Add New
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryItems.map((item) => (
            <div key={item._id} className="bg-gray-50 shadow rounded text-center overflow-hidden">
              <div className="p-2">
                <img src={item.galleryImage} alt={`gallery-${item._id}`} className="w-full h-[150px] rounded object-cover" />
                <div className="mt-2 flex justify-center gap-2">
                  <Link to={`/admin/gallery/${item._id}`} className="bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm rounded" title="Edit">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 text-sm rounded"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonLayout>
  );
}
