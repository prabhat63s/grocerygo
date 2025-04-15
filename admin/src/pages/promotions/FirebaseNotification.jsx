import React, { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { FaPlus, FaReply, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FirebaseNotification() {
    const [firebaseKey, setFirebaseKey] = useState("firebas");
    const [search, setSearch] = useState("");

    const notifications = [
        {
            id: 1,
            title: "Test",
            subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            category: "Cleaning Supplies",
            product: "--",
            created: "Oct 29, 2024 03:37 AM",
            updated: "Oct 29, 2024 03:37 AM",
        },
    ];

    const filtered = notifications.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Firebase Notification <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span></h1>
                </div>
            </div>
            <div className="p-4">
                {/* Firebase Key Form */}
                <form className="bg-white p-4 rounded-lg shadow mb-6">
                    <label className="block font-medium text-gray-700 mb-1">
                        Firebase Server Key <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={firebaseKey}
                        onChange={(e) => setFirebaseKey(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Firebase Server Key"
                        required
                    />
                    <div className="text-right mt-4">
                        <button
                            type="button"
                            onClick={() => console.log("Submit Key:", firebaseKey)}
                            className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <div className="p-4 bg-white rounded-md shadow">
                    {/* Add New Button */}
                    <div className="text-right mb-4 flex justify-end">
                        <Link to='/admin/firebase/add'
                            className="bg-black flex items-center gap-2 hover:bg-neutral-700 text-white px-4 py-2 rounded"

                        >
                            <FaPlus /> Add New
                        </Link>
                    </div>
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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Notifications Table */}
                    <div className="overflow-auto bg-white rounded-lg shadow">
                        <table className="min-w-full text-sm text-left border">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Subtitle</th>
                                    <th className="px-4 py-2 border">Category</th>
                                    <th className="px-4 py-2 border">Product</th>
                                    <th className="px-4 py-2 border">Created</th>
                                    <th className="px-4 py-2 border">Updated</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{idx + 1}</td>
                                            <td className="px-4 py-2 border">{item.title}</td>
                                            <td className="px-4 py-2 border max-w-xs">
                                                {item.subtitle}
                                            </td>
                                            <td className="px-4 py-2 border">{item.category}</td>
                                            <td className="px-4 py-2 border">{item.product}</td>
                                            <td className="px-4 py-2 border">{item.created}</td>
                                            <td className="px-4 py-2 border">{item.updated}</td>
                                            <td className="px-4 py-2 border">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => console.log("Resend", item.id)}
                                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        <FaReply />
                                                    </button>
                                                    <button
                                                        onClick={() => console.log("Delete", item.id)}
                                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-gray-500">
                                            No notifications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
