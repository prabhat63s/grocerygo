import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaPlus, FaTrash } from 'react-icons/fa';
import AddVariantsModal from '../../components/modals/AddVariantsModal';

export default function AddProducts() {
    const [itemType, setItemType] = useState(1);
    const [hasExtras, setHasExtras] = useState(2); // 1 = Yes, 2 = No

    // Fix: Ensure all extras have unique IDs
    const [extras, setExtras] = useState([
        { id: 1, name: 'Extra 1', price: 10 },
        { id: 2, name: 'Extra 2', price: 20 },
        { id: 3, name: 'Extra 3', price: 30 },
        { id: 4, name: 'Extra 4', price: 40 },
        { id: 5, name: 'Extra 5', price: 50 },
    ]);

    const addExtra = () => {
        const nextId = extras.length ? Math.max(...extras.map(e => e.id)) + 1 : 1;
        setExtras([...extras, { id: nextId, name: '', price: '' }]);
    };

    const removeExtra = (id) => {
        setExtras(extras.filter(extra => extra.id !== id));
    };

    const updateExtra = (id, key, value) => {
        setExtras(extras.map(extra =>
            extra.id === id ? { ...extra, [key]: value } : extra
        ));
    };

    const handleGlobalExtras = () => {
        alert('Global Extras modal triggered!');
    };


    const [hasVariants, setHasVariants] = useState(2); // 1 = Yes, 2 = No
    const [showStockFields, setShowStockFields] = useState(false);
    const [isvariantsModalOpen, setIsVariantsModalOpen] = useState(false);
    const [isVariantsVisible, setIsVariantsVisible] = useState(false);

    const handleVariantToggle = (value) => {
        setHasVariants(value);
    };

    const handleStockToggle = (value) => {
        setShowStockFields(value === 1);
    };


    const [images, setImages] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleTaxChange = (e) => {
        const options = Array.from(e.target.selectedOptions).map((option) => parseInt(option.value));
        setSelectedTaxes(options);
    };


    const [description, setDescription] = useState('');







    // Initialize form state with name, type,
    const [formData, setFormData] = useState({
        name: '',
        type: '',
    });

    const navigate = useNavigate();

    // Handle input changes for text and select inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission; process form data and navigate back if needed
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // You can add your API call here before navigating
        navigate('/admin/item');
    };

    // Handle cancel action
    const handleCancel = () => {
        navigate('/admin/item');
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/item">Products</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md flex flex-col space-y-2 bg-white">
                    {/* Category */}
                    <div className="grid md:grid-cols-10 gap-6">
                        {/* Category Field */}
                        <div className="md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                            >
                                <option value selected> Select</option>
                                <option value={2} data-id={2}>Vegetables</option>
                                <option value={3} data-id={3}>Condiments &amp; Spices</option>
                                <option value={9} data-id={9}>Bread &amp; Bakery</option>
                                <option value={5} data-id={5}>Beverage</option>
                                <option value={8} data-id={8}>Snacks</option>
                                <option value={6} data-id={6}>Dairy Products</option>
                                <option value={7} data-id={7}>Meat</option>
                                <option value={4} data-id={4}>Personal Care</option>
                                <option value={1} data-id={1}>Fruits</option>
                                <option value={10} data-id={10}>Cleaning Supplies</option>
                            </select>
                        </div>

                        {/* Subcategory Field */}
                        <div className="md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Subcategory
                            </label>
                            <select
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                            >
                                <option value selected> Select
                                </option>

                            </select>
                        </div>

                        {/* Name Field*/}
                        <div className="md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                            />
                        </div>
                    </div>

                    {/* Product type * */}
                    <div className="grid md:grid-cols-10 gap-6">
                        {/* Product type */}
                        <div className="md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Product type <span className="text-red-500">*</span>
                            </label>
                            <div className='flex gap-2'>
                                {/* Veg Option */}
                                <label className="inline-flex items-center cursor-pointer mt-2">
                                    <input
                                        type="radio"
                                        name="item_type"
                                        value={1}
                                        checked={itemType === 1}
                                        onChange={() => setItemType(1)}
                                        className="form-radio text-green-600"
                                    />
                                    <img
                                        src="https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/veg.svg"
                                        alt="Veg"
                                        className="w-5 h-5 mx-2"
                                    />
                                    <span className="text-sm font-medium">Veg</span>
                                </label>

                                {/* Non-Veg Option */}
                                <label className="inline-flex items-center cursor-pointer mt-2">
                                    <input
                                        type="radio"
                                        name="item_type"
                                        value={2}
                                        checked={itemType === 2}
                                        onChange={() => setItemType(2)}
                                        className="form-radio text-red-600"
                                    />
                                    <img
                                        src="https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/nonveg.svg"
                                        alt="Non-Veg"
                                        className="w-5 h-5 mx-2"
                                    />
                                    <span className="text-sm font-medium">Non-Veg</span>
                                </label>

                            </div>
                        </div>

                        {/* SKU */}
                        <div className="md:col-span-3">
                            <label className="block mb-1 font-medium">
                                SKU
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="SKU"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                            />
                        </div>

                        {/* Video URL*/}
                        <div className="md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Video URL
                            </label>
                            <input
                                type="text"
                                name="Video URL"
                                placeholder="Video URL"
                                value={formData.videoURL}
                                onChange={handleInputChange}
                                required
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                            />
                        </div>
                    </div>

                    {/* Product Has extra */}
                    <div className="space-y-4">
                        {/* Radio Selector */}
                        <div className='flex justify-between'>
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Has Extras?</label>
                                <div className="flex gap-6">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="has_extras"
                                            value={2}
                                            checked={hasExtras === 2}
                                            onChange={() => setHasExtras(2)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="has_extras"
                                            value={1}
                                            checked={hasExtras === 1}
                                            onChange={() => setHasExtras(1)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                </div>
                            </div>
                            {/* Buttons */}
                            {hasExtras === 1 && (
                                <div className="flex gap-4 h-fit mt-2">
                                    <button
                                        type="button"
                                        onClick={handleGlobalExtras}
                                        className="bg-black text-white px-4 py-1.5 rounded hover:bg-neutral-700"
                                    >
                                        <i className="fas fa-plus mr-1" /> Add Global Extras
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addExtra}
                                        className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Extras Fields */}
                        {hasExtras === 1 && (
                            <div className="space-y-3">
                                {extras.map((extra) => (
                                    <div
                                        key={extra.id}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={extra.name}
                                            onChange={(e) => updateExtra(extra.id, 'name', e.target.value)}
                                            className="w-full border border-gray-300 px-2 py-1.5 rounded"
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                step="any"
                                                value={extra.price}
                                                onChange={(e) => updateExtra(extra.id, 'price', e.target.value)}
                                                className="w-full border border-gray-300 px-2 py-1.5 rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExtra(extra.id)}
                                                className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Has Variation  */}
                    <div className=''>
                        <div className="flex items-center justify-between w-full gap-4">
                            <div>
                                <label className="block font-medium mb-1">Product Has Variation</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="has_variants"
                                            value={2}
                                            checked={hasVariants === 2}
                                            onChange={() => handleVariantToggle(2)}
                                        />
                                        No
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="has_variants"
                                            value={1}
                                            checked={hasVariants === 1}
                                            onChange={() => handleVariantToggle(1)}
                                        />
                                        Yes
                                    </label>
                                </div>
                            </div>

                            {hasVariants === 1 && (<button
                                type="button"
                                onClick={() => setIsVariantsModalOpen(true)}
                                className="bg-yellow-500 text-white px-2 py-1.5 rounded hover:bg-yellow-600"
                            >
                                <FaPlus />
                            </button>)}
                        </div>

                        {hasVariants === 2 && (
                            <>
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block mb-1 font-medium">
                                            Original Price <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="original_price"
                                            placeholder="Original Price"
                                            className="w-full border border-gray-300 px-2 py-1.5 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">
                                            Selling Price <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 px-2 py-1.5 rounded"
                                            name="price"
                                            placeholder="Selling Price"
                                        />
                                    </div>

                                    <div className="col-span-2 mt-2">
                                        <label className="block mb-1 font-medium">Stock Management</label>
                                        <div className="flex gap-4">
                                            <label className="inline-flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="has_stock"
                                                    value={2}
                                                    defaultChecked
                                                    onChange={() => handleStockToggle(2)}
                                                />
                                                No
                                            </label>
                                            <label className="inline-flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="has_stock"
                                                    value={1}
                                                    onChange={() => handleStockToggle(1)}
                                                />
                                                Yes
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                {showStockFields && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                        <div>
                                            <label className="block mb-1 font-medium">
                                                Stock QTY <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                                name="qty"
                                                placeholder="Stock QTY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">
                                                Min. Order Qty <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                                name="min_order"
                                                placeholder="Min. Order Qty"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">
                                                Max. Order Qty <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                                name="max_order"
                                                placeholder="Max. Order Qty"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 font-medium">
                                                Low QTY Warning <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                                name="low_qty"
                                                placeholder="Low QTY Warning"
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <AddVariantsModal isOpen={isvariantsModalOpen} onClose={() => setIsVariantsModalOpen(false)} setIsVariantsVisible={setIsVariantsVisible} />

                        {isVariantsVisible && (
                            <div className="mt-6 bg-white rounded-lg  border">
                                <div className="px-4 py-2 border-b font-semibold">Product Variants</div>
                                <div className="overflow-auto p-4">
                                    <table className="table-auto w-full text-sm text-left border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100 text-center">
                                                <th className="border px-2 py-1">Name</th>
                                                <th className="border px-2 py-1">Original Price</th>
                                                <th className="border px-2 py-1">Selling Price</th>
                                                <th className="border px-2 py-1">Stock QTY</th>
                                                <th className="border px-2 py-1">Min. Order Qty</th>
                                                <th className="border px-2 py-1">Max. Order Qty</th>
                                                <th className="border px-2 py-1">Low QTY Warning</th>
                                                <th className="border px-2 py-1">Stock Management</th>
                                                <th className="border px-2 py-1">Available</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center">
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" value="asfd" readOnly /></td>
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" type="number" placeholder="Original Price" required /></td>
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" type="number" placeholder="Selling Price" required /></td>
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" type="number" placeholder="Stock QTY" /></td>
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" type="number" placeholder="Min. Order" /></td>
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" type="number" placeholder="Max. Order" /></td>
                                                <td className='border px-2 py-1 '><input className="border my-1 rounded-md p-2 w-full" type="number" placeholder="Low QTY" /></td>
                                                <td className='border px-2 py-1 '><input type="checkbox" className="form-checkbox" /></td>
                                                <td className='border px-2 py-1 '><input type="checkbox" className="form-checkbox" defaultChecked /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">
                                    Image (512 x 512) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-[3px] file:mr-3 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                            <div className="gallery flex flex-wrap gap-2 mt-2">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className="w-20 h-20 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tax Selection */}
                        <div>
                            <label className="block text-sm font-medium">Tax</label>
                            <select
                                name="tax"
                                // value={formData.category}
                                // onChange={handleInputChange}
                                required
                                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
                            >
                                <option value selected> Select</option>

                                <option value={8}>SGST</option>
                                <option value={9}>CGST</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            placeholder="Description"
                            className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>



                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
