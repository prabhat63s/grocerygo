import React, { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ChooseUsUI from "./ChooseUsUI";

export default function WhyChooseUs() {
    const [search, setSearch] = useState("");

    const notifications = [
        {
            id: 1,
            image: "/img/choose-1.png",
            title: "Responsive Website or Platform",
            subtitle: "If you have your own website, ensure it's mobile-responsive and user-friendly",
            created: "Jun 05, 2024 07:17 AM",
            updated: "Jan 28, 2025 04:09 AM",
        },
        {
            id: 2,
            image: "/img/choose-2.png",
            title: "Product Research and Selection",
            subtitle: "Conduct thorough market research to identify trending and in-demand products",
            created: "Jun 05, 2024 07:16 AM",
            updated: "Jan 28, 2025 04:09 AM",
        },
        {
            id: 3,
            image: "/img/choose-3.png",
            title: "Quality Product Listings",
            subtitle: "Create clear, detailed, and accurate product listings with high-quality images",
            created: "Jun 05, 2024 07:17 AM",
            updated: "Jun 18, 2024 10:47 AM",
        },
        {
            id: 4,
            image: "/img/choose-4.png",
            title: "Pricing and Discounts",
            subtitle: "Price your products competitively based on market research and production costs.",
            created: "Jun 05, 2024 07:17 AM",
            updated: "Jun 18, 2024 10:47 AM",
        },
    ];


    const filtered = notifications.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gaborder px-4 py-2 md:items-center">
                    <h1 className="text-2xl font-semibold">Why Choose Us</h1>
                </div>

                {/* Form */}
               <ChooseUsUI />

                {/* Table Actions */}
                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="flex justify-end mb-4">
                        <Link
                            to="/admin/choose_us/add"
                            className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <FaPlus /> Add New
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-4">
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="border px-4 py-2 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/10 hover:border-black">
                                Excel
                            </button>
                            <button className="border px-4 py-2 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/10 hover:border-black">
                                PDF
                            </button>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="text-sm">Search:</span>
                            <input
                                type="search"
                                className="border px-4 py-2 rounded-md w-full md:w-64 outline-none"
                                placeholder="Search by product name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-auto">
                        <table className="w-full text-sm text-left border rounded shadow bg-white">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="border px-4 py-2">#</th>
                                    <th className="border px-4 py-2">Image</th>
                                    <th className="border px-4 py-2">Title</th>
                                    <th className="border px-4 py-2">Subtitle</th>
                                    <th className="border px-4 py-2">Created Date</th>
                                    <th className="border px-4 py-2">Updated Date</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((item, index) => (
                                    <tr key={item.id} className="border hover:bg-gray-50">
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={item.image}
                                                alt="item"
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{item.title}</td>
                                        <td className="border px-4 py-2">{item.subtitle}</td>
                                        <td className="border px-4 py-2">{item.created}</td>
                                        <td className="border px-4 py-2">{item.updated}</td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
