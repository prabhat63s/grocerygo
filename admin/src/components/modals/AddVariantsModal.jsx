import React from 'react';
import { MdClose } from 'react-icons/md';

export default function AddVariantsModal({ isOpen, onClose, setIsVariantsVisible }) {
    if (!isOpen) return null;

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        setIsVariantsVisible(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white mx-4 rounded-xl shadow-lg w-full max-w-lg p-6 transform transition-all duration-300 ease-out animate-slideDown">
                <div className="flex justify-between items-center border-b pb-3">
                    <h5 className="text-xl font-semibold">Add Variants</h5>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <MdClose size={20} />
                    </button>
                </div>

                <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="variant_name" className="block text-sm font-medium text-gray-700">
                                Variant Name
                            </label>
                            <input
                                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                name="variant_name"
                                type="text"
                                placeholder="Variant Name, i.e Size, Color etc"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="variant_options" className="block text-sm font-medium text-gray-700">
                                Variant Options
                            </label>
                            <input
                                className="mt-1 block w-full border rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                name="variant_options"
                                type="text"
                                placeholder="Variant Options separated by | pipe symbol, i.e Black|Blue|Red"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700"
                            >
                                Add Variants
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
