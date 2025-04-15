import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableRow({ tax, idx, index, handleEdit, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tax.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
    >
      <td className="border px-4 py-2 text-gray-600 cursor-move" title="Move">
        <FaArrowsAlt />
      </td>
      <td className="border px-4 py-2">{idx}</td>
      <td className="border px-4 py-2">{tax.name}</td>
      <td className="border px-4 py-2">{tax.tax}</td>
      <td className="border px-4 py-2">
        <span className="bg-green-500 text-white w-fit p-1.5 rounded-md flex items-center justify-center">
          {tax.status || <FaCheck />}
        </span>
      </td>
      <td className="border px-4 py-2 md:w-32">{tax.createdDate}</td>
      <td className="border px-4 py-2 md:w-32">{tax.updatedDate}</td>
      <td className="border px-4 py-2 text-white">
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md"
            title="Edit"
            onClick={handleEdit}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md"
            title="Delete"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function Tax() {
  const initialTaxes = [
    {
      id: '1',
      name: 'SGST',
      tax: '9%',
      status: '',
      createdDate: 'Jun 10, 2024 09:10 AM',
      updatedDate: 'Jan 27, 2025 11:36 PM',
    },
    {
      id: '2',
      name: 'CGST',
      tax: '9%',
      status: '',
      createdDate: 'Jun 10, 2024 09:10 AM',
      updatedDate: 'Jan 27, 2025 11:36 PM',
    },
  ];

  const [taxes, setTaxes] = useState(initialTaxes);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const sensors = useSensors(useSensor(PointerSensor));

  const filteredTaxes = taxes.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTaxes.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTaxes = filteredTaxes.slice(indexOfFirst, indexOfLast);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const activeIndex = taxes.findIndex((item) => item.id === active.id);
      const overIndex = taxes.findIndex((item) => item.id === over?.id);
      setTaxes((prev) => arrayMove(prev, activeIndex, overIndex));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">Tax</h1>
          <Link
            to="/admin/tax/add"
            className="px-5 flex gap-2 justify-center items-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded"
          >
            <FaPlus /> Add New
          </Link>
        </div>

        <div className="p-4 bg-white rounded-md shadow">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="flex w-full gap-2">
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                Excel
              </button>
              <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">
                PDF
              </button>
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
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={currentTaxes.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <table className="min-w-full text-sm border border-gray-200 rounded-md">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border px-4 py-2 text-left"></th>
                      <th className="border px-4 py-2 text-left">#</th>
                      <th className="border px-4 py-2 text-left">Name</th>
                      <th className="border px-4 py-2 text-left">Tax</th>
                      <th className="border px-4 py-2 text-left">Status</th>
                      <th className="border px-4 py-2 text-left">Created Date</th>
                      <th className="border px-4 py-2 text-left">Updated Date</th>
                      <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTaxes.map((tax, idx) => (
                      <SortableRow
                        key={tax.id}
                        tax={tax}
                        idx={indexOfFirst + idx + 1}
                        index={idx}
                        handleEdit={() => { }}
                        handleDelete={() => { }}
                      />
                    ))}
                  </tbody>
                </table>
              </SortableContext>
            </DndContext>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>
              Showing{' '}
              {filteredTaxes.length === 0
                ? '0 to 0'
                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredTaxes.length)}`}{' '}
              of {filteredTaxes.length} entries
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
