import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link, useNavigate } from 'react-router-dom';
import useCategory from '../../hook/useCategory';
import { FaX } from 'react-icons/fa6';

export default function Categories() {
  const { categories, loading, error, updateCategoryStatus, deleteCategory } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  // Filtered and paginated categories
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updated = [...categories];
    const sourceIndex = indexOfFirst + result.source.index;
    const destinationIndex = indexOfFirst + result.destination.index;
    const [removed] = updated.splice(sourceIndex, 1);
    updated.splice(destinationIndex, 0, removed);
  };

  const toggleStatus = (catId) => {
    const updatedCategories = categories.map((cat) =>
      cat._id === catId ? { ...cat, status: !cat.status } : cat
    );
    updateCategoryStatus(catId, updatedCategories);
  };

  const handleDelete = async (catId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      await deleteCategory(catId);
    }
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Link to='/admin/category/add' className="px-5 flex gap-2 items-center justify-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
            <FaPlus /> Add New
          </Link>
        </div>

        <div className="p-4 bg-white rounded-md shadow">
          {/* Search & Export */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="flex w-full gap-2">
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
            </div>
            <div className="flex items-center justify-between md:justify-end w-full gap-1">
              <span>Search:</span>
              <input
                type="search"
                placeholder="Search by category name"
                className="border w-full md:w-fit px-4 py-1 rounded-md outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <table className="min-w-full text-sm border border-gray-200 rounded-md">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left"></th>
                      <th className="border px-4 py-2 text-left">#</th>
                      <th className="border px-4 py-2 text-left">Category Name</th>
                      <th className="border px-4 py-2 text-left">Status</th>
                      <th className="border px-4 py-2 text-left">Created Date</th>
                      <th className="border px-4 py-2 text-left">Updated Date</th>
                      <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <Droppable droppableId="categoryTable">
                    {(provided) => (
                      <tbody ref={provided.innerRef} {...provided.droppableProps}>
                        {currentCategories.map((cat, idx) => (
                          <Draggable key={cat._id} draggableId={cat._id} index={idx}>
                            {(provided) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                              >
                                <td className="border px-4 py-2 text-gray-600 cursor-move" {...provided.dragHandleProps} title="Move">
                                  <FaArrowsAlt />
                                </td>
                                <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                <td className="border px-4 py-2">{cat.name}</td>
                                <td className="border px-4 py-2">
                                  <span
                                    onClick={() => toggleStatus(cat._id)}
                                    className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${cat.status ? "bg-green-500" : "bg-red-500"}`}
                                  >
                                    {cat.status ? <FaCheck /> : <FaX />}
                                  </span>
                                </td>
                                <td className="border px-4 py-2 md:w-32">{new Date(cat.createdAt).toLocaleString()}</td>
                                <td className="border px-4 py-2 md:w-32">{new Date(cat.updatedAt).toLocaleString()}</td>
                                <td className="border px-4 py-2 text-white">
                                  <div className="flex items-center gap-2">
                                    <button
                                      className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md"
                                      title="Edit"
                                      onClick={() => navigate(`/admin/category/${cat._id}`)}
                                    >
                                      <FaEdit />
                                    </button>
                                    <button
                                      className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md"
                                      title="Delete"
                                      onClick={() => handleDelete(cat._id)}
                                    >
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
            )}
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <div>
                Showing{" "}
                {filteredCategories.length === 0
                  ? "0 to 0"
                  : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredCategories.length)}`}{" "}
                of {filteredCategories.length} entries
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
          )}
        </div>
      </div>
    </CommonLayout>
  );
}
