import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

export default function Subcategories() {
  const initialSubcategories = [
    { id: '1', subcategoryName: 'Dishwashing soap', categoryName: 'Cleaning Supplies', status: '', createdDate: 'Aug 01, 2022 03:36 AM', updatedDate: 'Aug 01, 2022 03:36 AM' },
    { id: '2', subcategoryName: 'Fresh Fruits', categoryName: 'Fruits', status: '', createdDate: 'Aug 08, 2022 04:13 AM', updatedDate: 'Aug 09, 2022 02:16 PM' },
    { id: '3', subcategoryName: 'Cream', categoryName: 'Dairy Products', status: '', createdDate: 'Aug 08, 2022 04:06 AM', updatedDate: 'Aug 08, 2022 04:06 AM' },
    { id: '4', subcategoryName: 'Sweets', categoryName: 'Dairy Products', status: '', createdDate: 'Aug 08, 2022 04:05 AM', updatedDate: 'Aug 08, 2022 04:05 AM' },
    { id: '5', subcategoryName: 'Milk', categoryName: 'Dairy Products', status: '', createdDate: 'Aug 08, 2022 04:04 AM', updatedDate: 'Aug 08, 2022 04:04 AM' },
    { id: '6', subcategoryName: 'Cold/Energy Drinks', categoryName: 'Beverage', status: '', createdDate: 'Aug 05, 2022 06:30 AM', updatedDate: 'Aug 05, 2022 06:30 AM' },
    { id: '7', subcategoryName: 'Soft Drinks', categoryName: 'Beverage', status: '', createdDate: 'Aug 05, 2022 06:30 AM', updatedDate: 'Aug 09, 2022 08:36 PM' },
    { id: '8', subcategoryName: 'Fresh Juice', categoryName: 'Beverage', status: '', createdDate: 'Aug 01, 2022 03:44 AM', updatedDate: 'Aug 01, 2022 03:44 AM' },
    { id: '9', subcategoryName: 'Coffee', categoryName: 'Beverage', status: '', createdDate: 'Aug 01, 2022 03:43 AM', updatedDate: 'Aug 01, 2022 03:43 AM' },
    { id: '10', subcategoryName: 'Ghee', categoryName: 'Dairy Products', status: '', createdDate: 'Aug 01, 2022 03:43 AM', updatedDate: 'Aug 01, 2022 03:43 AM' },
  ];

  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter subcategories based on the subcategory name
  const filteredSubcategories = subcategories.filter(item =>
    item.subcategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubcategories.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  // Only display the rows on the current page
  const currentSubcategories = filteredSubcategories.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  // Adjust the drag indices based on pagination offset
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Create a copy of the entire subcategories list
    const updatedSubcategories = [...subcategories];
    const sourceIndex = indexOfFirst + result.source.index;
    const destinationIndex = indexOfFirst + result.destination.index;

    const [removed] = updatedSubcategories.splice(sourceIndex, 1);
    updatedSubcategories.splice(destinationIndex, 0, removed);

    setSubcategories(updatedSubcategories);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">Subcategories</h1>
          <Link to='/admin/sub-category/add' className="px-5 flex gap-2 justify-center items-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
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
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
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
                    <th className="border px-4 py-2 text-left">Subcategory Name</th>
                    <th className="border px-4 py-2 text-left">Category Name</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Created Date</th>
                    <th className="border px-4 py-2 text-left">Updated Date</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <Droppable droppableId="subcategoryTable">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {currentSubcategories.map((cat, idx) => (
                        <Draggable key={cat.id} draggableId={cat.id} index={idx}>
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
                              <td className="border px-4 py-2">{cat.subcategoryName}</td>
                              <td className="border px-4 py-2">{cat.categoryName}</td>
                              <td className="border px-4 py-2">
                                <span className="bg-green-500 text-white w-fit p-1.5 rounded-md flex items-center justify-center">
                                  {cat.status || <FaCheck />}
                                </span>
                              </td>
                              <td className="border px-4 py-2 md:w-32">{cat.createdDate}</td>
                              <td className="border px-4 py-2 md:w-32">{cat.updatedDate}</td>
                              <td className="border px-4 py-2 text-white">
                                <div className="flex items-center gap-2">
                                  <button className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                    <FaEdit />
                                  </button>
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

          {/* Pagination Footer */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing{" "}
              {filteredSubcategories.length === 0
                ? "0 to 0"
                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredSubcategories.length)}`}{" "}
              of {filteredSubcategories.length} entries
            </div>
            <div className="space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
