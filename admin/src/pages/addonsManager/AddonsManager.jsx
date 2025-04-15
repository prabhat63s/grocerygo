import React from 'react';
import CommonLayout from '../../components/layout/CommonLayout';
import { Link } from 'react-router-dom';

export default function AddonsManager() {
    return (
        <CommonLayout>
            <div className="p-5 flex flex-col gap-6">
                <div className="bg-white shadow-md rounded-md p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="text-xl font-bold mb-2">Visit our store to purchase addons</h5>
                            <p className="text-gray-600">Install our addons to unlock premium features</p>
                        </div>
                        <Link to="/" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            Visit Our Store
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <h5 className="text-2xl font-semibold">Addons Manager</h5>
                    <div>
                        <Link to="/admin/createsystem-addons" className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-500 flex items-center">
                            <i className="fa-regular fa-plus mr-2 text-xl font-medium" /> Install
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-md">
                    <div className="p-6">
                        <div className="border-b border-gray-200">
                            <nav>
                                <div className="flex space-x-4">
                                    <a className="font-semibold py-2 px-4 border border-b-[0px] bg-gray-50 rounded-t-md" href="#installed" role="tab">
                                        Installed Addons (53)
                                    </a>
                                </div>
                            </nav>
                        </div>

                        <div id="installed" className="py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[...Array(10)].map((_, index) => (
                                    <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
                                        <img className="w-full h-48 object-cover" src="https://grocerygo.infotechgravity.com/storage/app/public/addons/age_verification.png" alt="Addon" />
                                        <div className="p-4">
                                            <h5 className="text-lg font-semibold">Age Verification</h5>
                                        </div>
                                        <div className="bg-gray-100 p-4 flex justify-between items-center">
                                            <p className="text-sm text-gray-500"><small>05 Feb 2025</small></p>
                                            <button className="bg-green-700 text-white text-sm py-2 px-4 rounded-md hover:bg-green-600">Activated</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
