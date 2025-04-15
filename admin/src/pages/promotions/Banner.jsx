import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';

export default function Banner() {
  const { id } = useParams();
  const initialBanners = [
    {
      id: '1',
      image: 'https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/slider/slider-66712f63544a0.png',
      category: 'Dairy Products',
      product: '--',
      status: 'active',
      createdAt: 'Jun 18, 2024 07:20 AM',
      updatedAt: 'Jan 28, 2025 12:16 AM'
    },
    {
      id: '2',
      image: 'https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/slider/slider-667130d0e8062.png',
      category: 'Bread & Bakery',
      product: '--',
      status: 'active',
      createdAt: 'Jun 18, 2024 07:03 AM',
      updatedAt: 'Jan 28, 2025 12:16 AM'
    }
  ];

  const [banners, setBanners] = useState(initialBanners);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredBanners = banners.filter(banner =>
    banner.product.toLowerCase().includes(searchText.toLowerCase())
  );

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedList = [...banners];
    const sourceIndex = startIndex + result.source.index;
    const destinationIndex = startIndex + result.destination.index;

    const [movedItem] = updatedList.splice(sourceIndex, 1);
    updatedList.splice(destinationIndex, 0, movedItem);

    setBanners(updatedList);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold"> {id.replace(/-/g, ' ').replace(/bannersection/i, 'Banner Section')}</h1>
          <Link to={`/admin/banner/${id}/add`} className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <table className="min-w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border px-4 py-2 text-left"></th>
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
                <Droppable droppableId="banner-table" direction="vertical">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {currentBanners.map((banner, index) => (
                        <Draggable key={banner.id} draggableId={banner.id} index={index}>
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                            >
                              <td className="border px-4 py-2 text-gray-600 cursor-move" {...provided.dragHandleProps}><FaArrowsAlt /></td>
                              <td className="border px-4 py-2">{startIndex + index + 1}</td>
                              <td className="border px-4 py-2"><img src={banner.image} alt="Banner" className="h-12 rounded" /></td>
                              <td className="border px-4 py-2">{banner.category}</td>
                              <td className="border px-4 py-2">{banner.product}</td>
                              <td className="border px-4 py-2">
                                <span className="bg-green-500 text-white text-xs inline-flex items-center justify-center p-1.5 rounded">
                                  <FaCheck className="text-sm" />
                                </span>
                              </td>
                              <td className="border px-4 py-2">{banner.createdAt}</td>
                              <td className="border px-4 py-2">{banner.updatedAt}</td>
                              <td className="border px-4 py-2 text-white">
                                <div className="flex items-center gap-2">
                                  <Link to={`/admin/banner-${banner.id}`} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                    <FaEdit />
                                  </Link>
                                  <button className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </table>
            </DragDropContext>
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
