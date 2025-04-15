import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccessModal() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Modal Container */}
            <div className="bg-white mx-4 w-full max-w-md rounded-lg overflow-hidden">
                {/* Modal Body */}
                <div className="p-4 flex flex-col items-center justify-center">
                    <img
                        src="/img/success.svg"
                        alt="Success"
                        className="w-1/2 object-contain"
                    />
                    <h5 className="mt-3 font-medium text-center text-gray-800">
                        Thank you For ordering!
                    </h5>
                    <p className="text-center text-sm mt-3 leading-relaxed text-gray-600">
                        Thank you for your order
                    </p>
                </div>
                {/* Modal Footer */}
                <div className="p-4 flex justify-center">
                    <div className="flex gap-2 w-full">
                        <Link
                            id="order_id"
                            target="_blank"
                            className="w-full md:w-1/2 text-center border rounded font-medium text-gray-800 border-gray-800 py-2 hover:bg-gray-100"
                        >
                            Print
                        </Link>
                        <Link
                            to="/admin/pos/items"
                            className="w-full md:w-1/2 text-center rounded bg-black font-medium text-white py-2 hover:bg-neutral-700"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
