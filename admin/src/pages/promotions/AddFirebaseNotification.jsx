import React, { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { Link, useNavigate } from "react-router-dom";

export default function AddFirebaseNotification() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [product, setProduct] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const navigate = useNavigate()

    const categories = [
        "Cleaning Supplies", "Bread & Bakery", "Snacks", "Meat", "Dairy Products",
        "Beverage", "Personal Care", "Condiments & Spices", "Vegetables", "Fruits"
    ];

    const products = [
        "Amul Gold Full Cream Fresh Milk", "Darshana Pooja Ghee by Shubhkart", "Amul Unsalted Butter",
        "Amul Cheese Cubes", "Red Bull Energy Drink", "Pepsi Soft Drink", "Coca-Cola Zero Sugar Soft Drink",
        "Thums Up Soft Drink", "Nescafe Classic Instant Coffee - Pack of 60 Sachet", "Lay's Magic Masala Chips",
        "Onion", "Sinduri Mango"
    ];

    const handleSubmit = () => {
        const payload = {
            title,
            type,
            category: type === "1" ? category : null,
            product: type === "2" ? product : null,
            subtitle,
        };
        console.log("Saving notification:", payload);
        navigate("/admin/firebase")
        // Replace with API call
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/slider">Sliders</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-2 rounded-md shadow-md bg-white">
                    {/* Title */}
                    <div>
                        <label className="block font-medium mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full border mt-2 rounded px-3 py-2 bg-white"
                            >
                                <option value="">Select</option>
                                <option value="1">Category</option>
                                <option value="2">Product</option>
                            </select>
                        </div>

                        {/* Conditional Category Dropdown */}
                        {type === "1" && (
                            <div>
                                <label className="block mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border mt-2 rounded px-3 py-2 bg-white"
                                >
                                    <option value="">Select</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Conditional Product Dropdown */}
                        {type === "2" && (
                            <div>
                                <label className="block mb-1">
                                    Product <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    className="w-full border mt-2 rounded px-3 py-2 bg-white"
                                >
                                    <option value="">Select</option>
                                    {products.map((prod, idx) => (
                                        <option key={idx} value={prod}>{prod}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="block font-medium mb-1">
                            Subtitle <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            rows="5"
                            required
                            className="w-full border mt-2 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="text-end space-x-2">
                        <Link
                            to="/admin/firebase"
                            className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </CommonLayout>
    );
}
