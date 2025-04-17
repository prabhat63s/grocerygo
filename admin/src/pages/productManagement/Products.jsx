import React, { useEffect, useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCheck, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { useProduct } from '../../hook/useProduct';

export default function Products() {
  const { products, fetchAllProducts, loading, } = useProduct();


  useEffect(() => {
    fetchAllProducts();
  }, []);

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

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
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
            <table className="min-w-full text-sm border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
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
              <tbody>
                {currentProducts.map((product, idx) => (
                  <tr
                  key={idx}
                    className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                    <td className="border px-4 py-2 flex flex-col">{product?.name} <span className="text-[10px] bg-green-500 w-fit px-2 my-1 rounded-md text-white flex items-center gap-1"><FaEye size={14} /> {product.productView}</span> </td>
                    <td className="border px-4 py-2">{product?.category?.name}</td>
                    <td className="border px-4 py-2"> {product.sellingPrice !== "In Variants" ? (<>₹ {product.sellingPrice}</>) : (<span className="bg-blue-400 text-[10px] whitespace-nowrap py-1 px-2 text-white rounded-md">{product.price}</span>)} </td>
                    {/* <td className="border px-4 py-2 space-x-1 whitespace-nowrap">
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
                    </td> */}
                    <td className="border px-4 py-2 space-x-1 whitespace-nowrap">
                      {Array.isArray(product.stock) && product.stock.length > 0 ? (
                        <>
                          <span className="bg-green-500 text-[10px] px-2 text-white rounded-md inline-block">
                            Qty: {product.stock[0].stockQty}
                          </span>
                          {product.stock[0].stockQty <= product.stock[0].lowQtyWarning && (
                            <span className="bg-yellow-500 text-[10px] px-2 text-white rounded-md inline-block">
                              Low QTY
                            </span>
                          )}
                          <span className="bg-gray-500 text-[10px] px-2 text-white rounded-md inline-block">
                            Min: {product.stock[0].minOrderQty}
                          </span>
                          <span className="bg-gray-500 text-[10px] px-2 text-white rounded-md inline-block">
                            Max: {product.stock[0].maxOrderQty}
                          </span>
                        </>
                      ) : (
                        <span>-</span>
                      )}
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
                    <td className="border px-4 py-2 md:w-32">{new Date(product.createdAt).toLocaleString()}</td>
                    <td className="border px-4 py-2 md:w-32">{new Date(product.updatedAt).toLocaleString()}</td>
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
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <div>
            Showing {products.length === 0 ? '0 to 0' : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredProducts.length)}`} of {filteredProducts.length} entries
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
