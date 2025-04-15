import React from 'react'
import CommonLayout from '../../components/layout/CommonLayout'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

export default function BulkImportProducts() {
  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold flex items-center gap-2">Bulk import products <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span></h1>
          <Link to='/admin/media' className="px-5 flex gap-2 justify-center items-center py-1.5 bg-black hover:bg-neutral-700 text-white rounded">
            <FaPlus /> Add Media
          </Link>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b p-4">
            <h6 className="font-semibold">Step 1:</h6>
          </div>
          <div className="p-4">
            <ul className="list-decimal list-inside space-y-1 text-sm">
              <li>Download the example file to understand how the data must be filled.</li>
              <li>Once filled, upload it using the form below.</li>
              <li>To add multiple images, use the pipe (|) separator.</li>
              <li>Item type must be 1 or 2 (1 = veg, 2 = nonveg).</li>
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b p-4">
            <h6 className="font-semibold">Step 2:</h6>
          </div>
          <div className="p-4">
            <ul className="list-decimal list-inside space-y-1 text-sm">
              <li>Category should be in numerical ID.</li>
              <li>Download the PDF to get Category ID.</li>
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Download Category
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b p-4">
            <h6 className="font-semibold">Step 3:</h6>
          </div>
          <div className="p-4">
            <ul className="list-decimal list-inside space-y-1 text-sm">
              <li>Sub Category should be in numerical ID.</li>
              <li>Download the PDF to get Sub Category ID.</li>
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Download Sub Category
            </button>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b p-4">
            <h6 className="font-semibold">Step 4:</h6>
          </div>
          <div className="p-4">
            <ul className="list-decimal list-inside space-y-1 text-sm">
              <li>Tax should be in numerical ID.</li>
              <li>If adding multiple taxes, separate them with pipe (|).</li>
              <li>Download the PDF to get Tax ID.</li>
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Download Tax
            </button>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <form>
              <input
                type="hidden"
                name="_token"
                value="lUF5fA5Os5N0jmAEGINPhEiIDlCDvAScSmicpmcl"
                autoComplete="off"
              />
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Product Bulk Upload <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="file"
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                  required
                />
              </div>
              <button
                type="submit"
                className=" bg-black text-white px-4 py-2 rounded"
              >
                Import
              </button>
            </form>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}
