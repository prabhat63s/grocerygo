import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { FaCopy, FaEllipsisV } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Media() {
    const images = [
        "item-671258c20c640.webp",
        "item-67123f86dd973.webp",
        "item-67123f661af7c.webp",
        "item-67123f5c331a4.webp",
        "item-67123f17a8451.webp",
        "item-67123efe448a7.webp",
        "item-67123e978ec16.webp",
        "item-67123e8cb030c.webp",
        "item-67123102283b2.webp",
    ];

    const baseUrl = "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/";

    // Track which index's menu is open
    const [openMenuIndex, setOpenMenuIndex] = useState(null);

    const toggleMenu = (index) => {
        setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Image URL copied to clipboard!");
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Media (9 Images)</h1>
                </div>

                <form className="flex gap-3">
                    <input
                        type="file"
                        name="image[]"
                        className="w-full border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                        multiple
                    />
                    <button type="submit" className="bg-black text-white px-4 rounded">
                        Save
                    </button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {images.map((filename, index) => {
                        const imageUrl = `${baseUrl}${filename}`;
                        return (
                            <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    <button
                                        className="absolute top-2 right-2 text-white bg-yellow-500 p-1 rounded z-10"
                                        onClick={() => toggleMenu(index)}
                                    >
                                        <FaEllipsisV />
                                    </button>
                                    {openMenuIndex === index && (
                                        <ul className="absolute right-2 top-10 bg-white shadow-md rounded z-20 w-28">
                                            <li>
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                                    Delete
                                                </button>
                                            </li>
                                            <li>
                                                <a
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                    href={`https://grocerygo.infotechgravity.com/admin/media/download-${images.length - index}`}
                                                >
                                                    Download
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </div>

                                <Link to={imageUrl} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={imageUrl}
                                        alt={filename}
                                        className="w-full h-40 object-cover"
                                    />
                                </Link>

                                <div className="p-2 border-t flex items-center justify-between">
                                    <p className="text-sm truncate w-4/5">{filename}</p>
                                    <button
                                        className="text-gray-400 ml-2"
                                        onClick={() => handleCopy(imageUrl)}
                                        title="Copy"
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </CommonLayout>
    );
}