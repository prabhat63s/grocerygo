import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaArrowsAlt, FaCheck, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

export default function Products() {
  const initialProducts = [
    {
      id: '1',
      name: "Nescafe Classic Instant Coffee - Pack of 60 Sachet",
      category: "Beverage",
      price: "110.00",
      stock: "Low QTY",
      todaySpecial: '',
      status: '',
      productView: 120,
      createdDate: "Jun 19, 2024 07:57 AM",
      updatedDate: "Apr 07, 2025 04:27 PM"
    },
    {
      id: '2',
      name: "Chheda's Salt-n-Pepper Banana Chips - 170 g",
      category: "Snacks",
      price: "45.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 95,
      createdDate: "Jun 19, 2024 07:53 AM",
      updatedDate: "Apr 08, 2025 12:04 AM"
    },
    {
      id: '3',
      name: "Lay's India's Magic Masala Potato Chips (40 g)",
      category: "Snacks",
      price: "50.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 180,
      createdDate: "Jun 19, 2024 07:51 AM",
      updatedDate: "Apr 06, 2025 04:33 PM"
    },
    {
      id: '4',
      name: "Uncle Chipps Spicy Treat Flavour Potato Chips",
      category: "Snacks",
      price: "40.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 75,
      createdDate: "Jun 19, 2024 07:47 AM",
      updatedDate: "Apr 08, 2025 03:55 AM"
    },
    {
      id: '5',
      name: "Kurkure Masala Munch Crisps",
      category: "Snacks",
      price: "In Variants",
      stock: "In Variants",
      todaySpecial: '',
      status: '',
      productView: 210,
      createdDate: "Jun 19, 2024 07:34 AM",
      updatedDate: "Apr 07, 2025 10:59 PM"
    },
    {
      id: '6',
      name: "Meatzza Fresh Chicken Wings (Frozen)",
      category: "Meat",
      price: "80.00",
      stock: "In Stock",
      todaySpecial: '',
      status: '',
      productView: 160,
      createdDate: "Jun 19, 2024 07:25 AM",
      updatedDate: "Apr 07, 2025 09:13 PM"
    },
    {
      id: '7',
      name: "Chicken Wings With Skin -500gm",
      category: "Meat",
      price: "110.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 135,
      createdDate: "Jun 19, 2024 07:28 AM",
      updatedDate: "Apr 07, 2025 09:49 AM"
    },
    {
      id: '8',
      name: "Hide & Seek Chocolate Chip Cookies (Milano Collections)",
      category: "Bread & Bakery",
      price: "60.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 88,
      createdDate: "Jun 18, 2024 12:05 PM",
      updatedDate: "Apr 04, 2025 01:26 PM"
    },
    {
      id: '9',
      name: "Amul Gold Full Cream Fresh Milk",
      category: "Dairy Products",
      price: "30.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 200,
      createdDate: "Jun 21, 2024 11:09 AM",
      updatedDate: "Apr 05, 2025 02:22 AM"
    },
    {
      id: '10',
      name: "Let's Try Ragi Kaju Pista Cookies",
      category: "Bread & Bakery",
      price: "180.00",
      stock: "-",
      todaySpecial: '',
      status: '',
      productView: 105,
      createdDate: "Jun 18, 2024 11:05 AM",
      updatedDate: "Apr 05, 2025 04:14 PM"
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updated = [...products];
    const sourceIndex = indexOfFirst + result.source.index;
    const destIndex = indexOfFirst + result.destination.index;
    const [movedItem] = updated.splice(sourceIndex, 1);
    updated.splice(destIndex, 0, movedItem);
    setProducts(updated);
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className='flex gap-2'>
            <Link
              to='/admin/item/add'
              className="px-4 py-1.5 bg-black text-white rounded flex justify-center w-full md:w-fit items-center gap-2 hover:bg-neutral-700"
            >
              <FaPlus /> Add New
            </Link>
            <Link
              to=''
              className="px-4 py-1.5 bg-black text-white rounded flex justify-center w-full md:w-fit items-center gap-2 hover:bg-neutral-700"
            >
              Export <span className="bg-[#dc3545] text-xs px-2 py-[1px] text-white rounded-md">Addon</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded-md">
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

          <div className="overflow-x-auto">
            <DragDropContext onDragEnd={handleDragEnd}>
              <table className="min-w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2"></th>
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Stock</th>
                    <th className="border px-4 py-2">Today special</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Created Date</th>
                    <th className="border px-4 py-2">Updated Date</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <Droppable droppableId="productTable">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {currentProducts.map((product, idx) => (
                        <Draggable key={product.id} draggableId={product.id} index={idx}>
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                            >
                              <td {...provided.dragHandleProps} className="border px-2 py-2 text-gray-500 cursor-move">
                                <FaArrowsAlt />
                              </td>
                              <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                              <td className="border px-4 py-2 flex flex-col">{product.name} <span className="text-[10px] bg-green-500 w-fit px-2 my-1 rounded-md text-white flex items-center gap-1"><FaEye size={14} /> {product.productView}</span> </td>
                              <td className="border px-4 py-2">{product.category}</td>
                              <td className="border px-4 py-2"> {product.price !== "In Variants" ? (<>₹ {product.price}</>) : (<span className="bg-blue-400 text-[10px] whitespace-nowrap py-1 px-2 text-white rounded-md">{product.price}</span>)} </td>
                              <td className="border px-4 py-2 space-x-1 whitespace-nowrap">
                                {product.stock?.includes("In Stock") && (
                                  <span className="bg-green-500 text-[10px] px-2 text-white rounded-md inline-block">
                                    In Stock
                                  </span>
                                )}
                                {product.stock?.includes("Low QTY") && (
                                  <span className="bg-yellow-500 text-[10px] px-2 text-white rounded-md inline-block">
                                    Low QTY
                                  </span>
                                )}
                                {product.stock === "In Variants" && (
                                  <span className="bg-blue-400 text-[10px] px-2 text-white rounded-md inline-block">
                                    In Variants
                                  </span>
                                )}
                                {!product.stock || (product.stock === "-" && (
                                  <span>-</span>
                                ))}
                              </td>
                              <td className="border px-4 py-2">
                                {product.todaySpecial === true || product.todaySpecial === "true" ? (
                                  <span className="bg-green-500 text-white rounded p-1.5 w-fit flex items-center justify-center">
                                    {product.status || <FaCheck />}
                                  </span>
                                ) : (
                                  <span className="bg-red-500 text-white rounded p-1.5 w-fit flex items-center justify-center">
                                    {product.status || <MdClose />}
                                  </span>
                                )}
                              </td>

                              <td className="border px-4 py-2">
                                <span className="bg-green-500 text-white rounded p-1.5 w-fit flex items-center justify-center">
                                  {product.status || <FaCheck />}
                                </span>
                              </td>
                              <td className="border px-4 py-2">{product.createdDate}</td>
                              <td className="border px-4 py-2">{product.updatedDate}</td>
                              <td className="border px-4 py-2">
                                <div className="flex flex-col gap-2">
                                  <button className="bg-blue-500 w-fit hover:bg-blue-600 text-white p-1.5 rounded-md">
                                    <FaEdit />
                                  </button>
                                  <button className="bg-red-500 w-fit hover:bg-red-600 text-white p-1.5 rounded-md">
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

          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <div>
              Showing {filteredProducts.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredProducts.length)}`} of {filteredProducts.length} entries
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
