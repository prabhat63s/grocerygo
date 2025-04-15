import React from "react";
import { FaXmark } from "react-icons/fa6";

export default function OrderConfirmationModal({ handleClose, placeOrder }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Modal Container */}
            <div className="bg-gray-50 mx-4 h-[400px] w-full max-w-[800px] rounded-lg overflow-auto shadow-lg">
                {/* Modal Header */}
                <div className="flex justify-between items-center py-2 px-4 border-b">
                    <div className="flex-1 text-center">
                        <h3 className="font-semibold text-gray-800 text-lg my-3">
                            Order Confirmation
                        </h3>
                    </div>
                    <div className="flex-none">
                        <button
                            type="button"
                            className="bg-transparent border-0"
                            onClick={handleClose}
                        >
                            <FaXmark />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-4">
                    {/* Order Information Heading */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-800 font-medium border-b pb-1 mb-1">
                            Order Information
                        </p>
                    </div>

                    {/* Order Information Table Header */}
                    <div className="flex justify-between items-center py-2 border-b">
                        <div className="w-2/3 flex gap-2">
                            <div className="w-1/2 font-semibold text-black px-2 text-sm">
                                Product
                            </div>
                            <div className="w-1/4 text-center font-semibold text-black text-sm">
                                Qty
                            </div>
                        </div>
                        <div className="w-1/3 flex justify-end gap-2">
                            <div className="w-1/3 text-end font-semibold text-black text-sm">
                                Price
                            </div>
                            <div className="w-2/3 text-end font-semibold text-black text-sm">
                                Subtotal
                            </div>
                        </div>
                    </div>

                    {/* Order Item */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <tbody>
                                <tr className="align-middle">
                                    <td className="py-3">
                                        <h6 className="m-0 font-medium text-sm text-black line-clamp-2">
                                            Chheda&apos;s Salt-n-Pepper Banana Chips - 170 g
                                        </h6>
                                        <p className="m-0 text-xs text-gray-500"></p>
                                    </td>
                                    <td className="py-3 text-end">
                                        <div className="flex items-center justify-end">
                                            <p className="m-0 font-medium text-black">3</p>
                                        </div>
                                    </td>
                                    <td className="py-3 text-end">
                                        <p className="m-0 font-medium text-black text-sm">
                                            $45.00
                                        </p>
                                    </td>
                                    <td className="py-3 text-end">
                                        <p className="m-0 font-medium text-black text-sm">
                                            $135.00
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Order Notes & Payment Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-3 gap-4">
                        {/* Order Note */}
                        <div className="w-full md:w-1/2 p-2 bg-gray-100 rounded">
                            <label
                                htmlFor="cart_order_note"
                                className="block text-sm text-gray-800 font-medium mb-1"
                            >
                                Order note
                            </label>
                            <textarea
                                id="cart_order_note"
                                className="w-full border rounded bg-transparent p-2 h-24"
                                placeholder="Add note (with extra Instructions)"
                            ></textarea>
                        </div>

                        {/* Payment Summary */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between">
                            <div className="p-2">
                                <div className="flex justify-between py-1">
                                    <span className="font-semibold text-sm">Subtotal</span>
                                    <span
                                        className="font-semibold text-sm text-gray-800"
                                        id="ordersub_total"
                                    >
                                        $135.00
                                    </span>
                                </div>
                                <div className="text-gray-600 text-sm">
                                    <div className="flex justify-between py-1 orderdiscount_amount">
                                        <span>Discount</span>
                                        <span id="orderdiscount_amount"></span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>SGST</span>
                                        <span>$12.15</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>CGST</span>
                                        <span>$12.15</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm border-t py-1">
                                    <span className="font-semibold text-gray-800">
                                        Total Amount
                                    </span>
                                    <span
                                        className="font-semibold text-gray-800"
                                        id="ordergrand_total"
                                    >
                                        $159.30
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="py-3 border-t border-b">
                        <p className="mb-2 text-sm text-gray-800 font-medium">
                            Customer Information
                        </p>
                        <form className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <label
                                    htmlFor="customer_name"
                                    className="block text-sm font-medium text-gray-800 mb-1"
                                >
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    id="customer_name"
                                    placeholder="Full Name"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <span className="text-red-500 text-xs" id="customer_name_required"></span>
                            </div>
                            <div>
                                <label
                                    htmlFor="customer_email"
                                    className="block text-sm font-medium text-gray-800 mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="customer_email"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <span className="text-red-500 text-xs" id="customer_email_required"></span>
                            </div>
                            <div>
                                <label
                                    htmlFor="customer_phone"
                                    className="block text-sm font-medium text-gray-800 mb-1"
                                >
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    id="customer_phone"
                                    placeholder="Mobile"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <span className="text-red-500 text-xs" id="customer_phone_required"></span>
                            </div>
                        </form>
                    </div>

                    {/* Payment Information */}
                    <div className="pt-3">
                        <p className="mb-1 text-sm text-gray-800 font-medium">
                            Payment Information
                        </p>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="payment_type"
                                    value="1"
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2 text-sm font-medium">Cash</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="payment_type"
                                    value="0"
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2 text-sm font-medium">Online</span>
                            </label>
                        </div>
                        <span className="text-red-500 text-xs" id="payment_type_required"></span>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-center px-4 py-3 border-t">
                    <div className="w-full flex gap-4">
                        <button
                            type="button"
                            className="w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="w-1/2 bg-black text-white py-2 rounded flex items-center justify-center gap-3 hover:bg-neutral-700"
                            onClick={placeOrder}
                        >
                            Order Confirmed
                            <div className="loader hidden pos_order_loader"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
