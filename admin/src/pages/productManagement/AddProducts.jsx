import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaPlus, FaTrash } from 'react-icons/fa';
import AddVariantsModal from '../../components/modals/AddVariantsModal';
import { useProduct } from '../../hook/useProduct';
import { useAuth } from '../../context/AuthContext';
import useSubCategory from '../../hook/useSubCategory';
import useCategory from '../../hook/useCategory';
import useTax from '../../hook/useTax';
import Select from "react-select";


export default function AddProducts() {
    const { id } = useParams();
    const { createProduct } = useProduct();
    const { categories } = useCategory();
    const { subCategories } = useSubCategory();
    const { token } = useAuth();
    const navigate = useNavigate();
    const { taxes } = useTax();
    const [selectedTax, setSelectedTax] = useState([]);
    // veg or non-veg
    const [itemType, setItemType] = useState(1);
    // has extra fields
    const [hasExtras, setHasExtras] = useState(1);
    const [extras, setExtras] = useState([]);

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

    const handleAddGlobalExtras = () => {
        const globalExtras = [
            { id: 1, name: 'Extra 1', price: 10 },
            { id: 2, name: 'Extra 2', price: 20 },
            { id: 3, name: 'Extra 3', price: 30 },
            { id: 4, name: 'Extra 4', price: 40 },
            { id: 5, name: 'Extra 5', price: 50 },
        ];
        setExtras([...extras, ...globalExtras]);
    };
    // has variations
    const [hasVariants, setHasVariants] = useState(1);
    const [variants, setVariants] = useState([]);

    const [showStockFields, setShowStockFields] = useState(false);
    const [isvariantsModalOpen, setIsVariantsModalOpen] = useState(false);
    const [isVariantsVisible, setIsVariantsVisible] = useState(false);

    // Initialize form state with name, type,
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        tax: [],
    });

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    // Update formData when tax selection changes
    const handleTaxChange = (selectedOptions) => {
        // Map selected options to their values (tax IDs)
        const selectedTaxIds = selectedOptions.map(option => option.value);

        // Update the selected tax IDs and formData
        setSelectedTax(selectedTaxIds);

        // Update the formData tax field
        setFormData({
            ...formData,
            tax: selectedTaxIds,  // Store the selected tax IDs in formData
        });
    };

    // Handle input changes for text and select inputs
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "select-multiple") {
            const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({
                ...formData,
                [name]: selectedValues,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("sku", formData.sku || "");
        form.append("videoURL", formData.videoURL || "");
        form.append("category", formData.category);
        form.append("subCategory", formData.subCategory || "");
        form.append("type", itemType === 1 ? "veg" : "non-veg");

        const actualExtras = hasExtras === 2 && extras.length > 0 ? extras : [];
        form.append("hasExtras", actualExtras.length > 0);
        form.append("extras", JSON.stringify(actualExtras));

        const actualVariants = hasVariants === 2 && variants.length > 0 ? variants : [];
        form.append("hasVariants", actualVariants.length > 0);
        form.append("variants", JSON.stringify(actualVariants));

        form.append("originalPrice", formData.originalPrice || 0);
        form.append("sellingPrice", formData.sellingPrice || 0);

        form.append("stockManagement", showStockFields);
        form.append("stock", JSON.stringify([]));

        form.append("description", formData.description);

        // Append the selected taxes (which are stored in formData.tax)
        form.append("tax", JSON.stringify(formData.tax));

        images.forEach((file) => form.append("productImage", file));

        try {
            const result = await createProduct(form, token);
            console.log("Created product:", result);
            navigate("/admin/item");
        } catch (err) {
            console.error("Error creating product", err);
        }
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
                                <option> Select</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
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
                                <option> Select</option>
                                {subCategories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}

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
                                name="sku"
                                placeholder="SKU"
                                value={formData.sku}
                                onChange={handleInputChange}
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
                                name="videoURL"
                                placeholder="Video URL"
                                value={formData.videoURL}
                                onChange={handleInputChange}
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
                                            value={1}
                                            checked={hasExtras === 1}
                                            onChange={() => setHasExtras(1)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="has_extras"
                                            value={2}
                                            checked={hasExtras === 2}
                                            onChange={() => setHasExtras(2)}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                </div>
                            </div>
                            {/* Buttons */}
                            {hasExtras === 2 && (
                                <div className="flex gap-4 h-fit mt-2">
                                    <button
                                        type="button"
                                        onClick={handleAddGlobalExtras}
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
                        {hasExtras === 2 && (
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
                                            value={1}
                                            checked={hasVariants === 1}
                                            onChange={() => setHasVariants(1)}
                                        />
                                        No
                                    </label>
                                    <label className="inline-flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="has_variants"
                                            value={2}
                                            checked={hasVariants === 2}
                                            onChange={() => setHasVariants(2)}
                                        />
                                        Yes
                                    </label>
                                </div>
                            </div>

                            {hasVariants === 2 && (<button
                                type="button"
                                onClick={() => setIsVariantsModalOpen(true)}
                                className="bg-yellow-500 text-white px-2 py-1.5 rounded hover:bg-yellow-600"
                            >
                                <FaPlus />
                            </button>)}
                        </div>

                        {hasVariants === 1 && (
                            <>
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block mb-1 font-medium">
                                            Original Price <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="originalPrice"
                                            value={formData.originalPrice}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 px-2 py-1.5 rounded"
                                            placeholder="Original Price"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">
                                            Selling Price <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="sellingPrice"
                                            value={formData.sellingPrice}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 px-2 py-1.5 rounded"
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
                                                    value={1}
                                                    defaultChecked
                                                    onChange={() => setShowStockFields(1)}
                                                />
                                                No
                                            </label>
                                            <label className="inline-flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="has_stock"
                                                    value={2}
                                                    onChange={() => setShowStockFields(2)}
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
                            <Select
                                isMulti
                                options={taxes.map((tax) => ({
                                    value: tax._id,
                                    label: tax.name,
                                }))}
                                value={taxes.filter((tax) => selectedTax.includes(tax._id))}
                                onChange={handleTaxChange}
                                className="w-full"
                            />
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
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/item')}
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