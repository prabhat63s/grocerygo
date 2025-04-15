import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

const LogoutModal = ({ isOpen, setIsOpen, onConfirm }) => {

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white flex items-center flex-col w-full max-w-sm mx-4 rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-out animate-slideDown">
                        <BsExclamationCircle size={40} className="text-black" />
                        <h2 className="text-xl font-semibold text-center my-4">Are you sure?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-1.5 bg-gray-300 hover:bg-gray-400 rounded text-black"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    setIsOpen(false);
                                }}
                                className="px-5 py-1.5 bg-black hover:bg-neutral-700 text-white rounded"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutModal;
