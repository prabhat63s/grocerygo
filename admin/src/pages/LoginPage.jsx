import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required.';
            valid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            try {
                await login(formData.email, formData.password, formData.rememberMe);
                toast.success("Login successful!");
                navigate("/admin/home");
            } catch (error) {
                toast.error(error || "Invalid email or password");
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Section - Image */}
            <div className="flex w-full lg:w-2/3 bg-gray-200 items-center justify-center">
                <img
                    src="/img/login.png"
                    alt="Login Illustration"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/3 flex items-center justify-center">
                <div className="md:max-w-sm w-full px-4 py-8 md:px-8">
                    <div className="flex justify-center mb-6">
                        <img src="/img/logo.png" alt="Logo" className="h-14" />
                    </div>
                    <h2 className="text-2xl font-bold my-2">Login</h2>
                    <p>Please login to continue to your account</p>
                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-1.5 w-full border border-gray-300 rounded-md"
                            />
                            {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="p-2 pr-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between font-medium">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-black">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="text-black hover:text-neutral-700">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className=''>
                            <button
                                type="submit"
                                className="w-full bg-black hover:bg-neutral-700 text-white p-2 rounded-md"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
