import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useSubCategory from '../../hook/useSubCategory';
import { FaX } from 'react-icons/fa6';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { toast } from 'sonner';

export default function Subcategories() {
  const {
    subCategories,
    loading,
    error,
    deleteSubCategory,
    handleToggleStatus
  } = useSubCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rowsPerPage = 5;

  // Filter subcategories based on the subcategory name
  const filteredSubcategories = subCategories.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const confirmDelete = (catId) => {
    setDeleteId(catId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteId) {
      await deleteSubCategory(deleteId);
      toast.success("Subcategory deleted successfully!");
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <CommonLayout>
      <DeleteConfirmationModal show={showDeleteModal} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirmed} />
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
                placeholder="Search by subcategory name"
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
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
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
                <tbody>
                  {currentSubcategories.map((cat, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                    >
                      <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                      <td className="border px-4 py-2">{cat.name}</td>
                      <td className="border px-4 py-2">{cat.category?.name || "-"}</td>
                      <td className="border px-4 py-2">
                        <span
                          onClick={() => handleToggleStatus(cat._id)}
                          className={`text-white w-fit p-1.5 rounded-md flex items-center justify-center cursor-pointer ${cat.status ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {cat.status ? <FaCheck /> : <FaX />}
                        </span>
                      </td>
                      <td className="border px-4 py-2 md:w-32">{new Date(cat.createdAt).toLocaleString()}</td>
                      <td className="border px-4 py-2 md:w-32">{new Date(cat.updatedAt).toLocaleString()}</td>
                      <td className="border px-4 py-2 text-white">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/sub-category/${cat._id}`} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => confirmDelete(cat._id)}
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
            )}
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
