import React from 'react';
import { Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const galleryItems = [
  {
    id: 21,
    img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/gallery-62f66226ed74f.jpeg",
  },
  {
    id: 18,
    img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/gallery-62f6616a45ab7.jpeg",
  },
  {
    id: 17,
    img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/gallery-62f6616a45156.jpeg",
  },
];

export default function Gallery() {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // perform delete operation here
      console.log("Deleting gallery id:", id);
    }
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <Link to="/gallery/add" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700 flex items-center gap-2">
            <FaPlus /> Add New
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="bg-gray-50 shadow rounded text-center overflow-hidden">
              <div className="p-2">
                <img
                  src={item.img}
                  alt={`gallery-${item.id}`}
                  className="w-full h-[150px] rounded"
                />
                <div className="mt-2 flex justify-center gap-2">
                  <Link
                    to={`/admin/gallery-${item.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm rounded"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
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
