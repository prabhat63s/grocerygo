import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const ChangePasswordModal = ({ isOpen, setIsOpen }) => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (formData.newpassword !== formData.confirmpassword) {
            toast.error("New passwords do not match");
            return;
        }

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Password changed!");
                setIsOpen(false);
            } else {
                toast.error(data.message || "Failed to change password");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl p-6 transform transition-all duration-300 ease-out animate-slideDown">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Change Password</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        <form>
                            {/* Old Password */}
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Old Password</label>
                                <div className="mt-1 relative">
                                    <input
                                        name="oldpassword"
                                        type={showOldPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={formData.oldpassword}
                                        onChange={handleChange}
                                        placeholder="Old password"
                                        className="p-2 pr-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                    >
                                        {showOldPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="mb-4">
                                <label className="block font-medium mb-1">New Password</label>
                                <div className="mt-1 relative">
                                    <input
                                        name="newpassword"
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={formData.newpassword}
                                        onChange={handleChange}
                                        placeholder="New password"
                                        className="p-2 pr-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                    >
                                        {showNewPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label className="block font-medium mb-1">Confirm Password</label>
                                <div className="mt-1 relative">
                                    <input
                                        name="confirmpassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmpassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        className="p-2 pr-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="bg-black text-white px-4 py-2 rounded"
                                >
                                    Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChangePasswordModal;
