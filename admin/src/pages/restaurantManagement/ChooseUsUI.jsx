import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChooseUsUI() {
    const [form, setForm] = useState({
        title: "",
        subTitle: "",
        description: "",
        chooseUsUiImage: null,
    });

    const [existingImage, setExistingImage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch existing data
    useEffect(() => {
        fetchChooseUsUI();
    }, []);

    const fetchChooseUsUI = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/chooseUsUi`);
            if (res.data?.length) {
                const item = res.data[0]; // Assuming single item UI
                setForm({
                    title: item.title,
                    subTitle: item.subTitle,
                    description: item.description,
                    chooseUsUiImage: null,
                });
                setExistingImage(item.chooseUsUiImage);
                setIsEditing(true);
                setEditId(item._id);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "whyChooseUsImage") {
            setForm((prev) => ({ ...prev, chooseUsUiImage: files[0] }));
            setExistingImage(URL.createObjectURL(files[0]));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("subTitle", form.subTitle);
        formData.append("description", form.description);
        if (form.chooseUsUiImage) {
            formData.append("chooseUsUiImage", form.chooseUsUiImage);
        }

        try {
            if (isEditing) {
                // UPDATE
                await axios.put(`${import.meta.env.VITE_BASE_URL}/chooseUsUi/${editId}`, formData);
                alert("Updated successfully");
            } else {
                // CREATE
                await axios.post(`${import.meta.env.VITE_BASE_URL}/chooseUsUi`, formData);
                alert("Created successfully");
            }
            fetchChooseUsUI();
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("Something went wrong!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 shadow rounded-lg p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Subtitle <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="subTitle"
                        placeholder="Subtitle"
                        value={form.subTitle}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name="whyChooseUsImage"
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {existingImage && (
                        <img
                            src={existingImage}
                            alt="preview"
                            className="mt-2 w-24 h-24 rounded object-cover"
                        />
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        rows="5"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:ring focus:ring-blue-200"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    className="bg-black hover:bg-neutral-700 text-white px-6 py-2 rounded"
                >
                    {isEditing ? "Update" : "Save"}
                </button>
            </div>
        </form>
    );
}
