import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import CommonLayout from '../../components/layout/CommonLayout'
import { Link } from 'react-router-dom';
import OrderConfirmationModal from '../../components/modals/OrderConfirmationModal';
import OrderSuccessModal from '../../components/modals/OrderSuccessModal';
import { useState } from 'react';

export default function Checkout() {
    const [openOrderConfirmationModal, setOpenOrderConfirmationModal] = useState(false);
    const [openOrderSuccessModal, setOpenOrderSuccessModal] = useState(false);

    const handleOrderConfirmationClose = () => {
        setOpenOrderConfirmationModal(false);
    };

    const placeOrder = () => {
        console.log("Order placed!");

        setOpenOrderConfirmationModal(false);
        setOpenOrderSuccessModal(true);
    };

    return (
        <CommonLayout>
            {openOrderConfirmationModal && <OrderConfirmationModal handleClose={handleOrderConfirmationClose} placeOrder={placeOrder}  />}
            {openOrderSuccessModal && <OrderSuccessModal />}

            <div className="flex flex-col gap-5 p-5">
                <h1 className="text-2xl font-semibold">POS checkout</h1>

                <div className="flex gap-4 justify-between flex-col md:flex-row">
                    <div className="w-full md:w-[65%]">
                        <div className="flex flex-col shadow rounded-md bg-white p-4">

                            <div className="border-b pb-2">
                                <h2 className="text-xl font-semibold">Cart ( 1 Products)</h2>
                            </div>
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-2 border-b text-left text-xs font-semibold text-gray-600">Image</th>
                                        <th className="p-2 border-b text-left text-xs font-semibold text-gray-600">Products</th>
                                        <th className="p-2 border-b text-left text-xs font-semibold text-gray-600">Price</th>
                                        <th className="p-2 border-b text-left text-xs font-semibold text-gray-600">Qty</th>
                                        <th className="p-2 border-b text-left text-xs font-semibold text-gray-600">Total</th>
                                        <th className="p-2 border-b text-left text-xs font-semibold text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 text-sm">
                                        <td className="p-2 border-b">
                                            <img
                                                src="https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-66728e7c308b1.jpg"
                                                alt="Product"
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                        </td>
                                        <td className="p-2 border-b">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src="/img/veg.svg"
                                                    alt="type"
                                                    className="h-4 w-4"
                                                />
                                                <span className="w-44 font-semibold text-gray-800">
                                                    Chheda's Salt-n-Pepper Banana Chips - 170 g
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-2 border-b font-semibold text-gray-800">
                                            $45.00
                                        </td>
                                        <td className="p-2 border-b">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="bg-black text-white rounded p-1.5 hover:bg-neutral-700"

                                                >
                                                    <FaMinus />
                                                </button>
                                                <input
                                                    type="number"
                                                    className="w-8 p-[3px] text-center border rounded"
                                                    value="2"
                                                />
                                                <button
                                                    className="bg-black text-white rounded p-1.5 hover:bg-neutral-700"

                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2 border-b font-semibold text-gray-800">
                                            $90.00
                                        </td>
                                        <td className="p-2 border-b">
                                            <button
                                                className="bg-red-500 w-fit text-white rounded p-1.5 hover:bg-red-600"

                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full md:w-[35%] flex flex-col">
                        {/* Customer & Discount Card */}
                        <div className="bg-white shadow rounded mb-4">
                            <div className="p-4">
                                <div>
                                    <h5 className="text-gray-800 font-bold border-b pb-3 mb-3">
                                        Customer
                                    </h5>
                                </div>
                                <select
                                    className="block w-full p-2 border rounded my-3"
                                    aria-label="Default select example"
                                    id="customer_info"
                                >
                                    <option value="walk-in customer">Walk In Customer</option>
                                    <option value="3">User</option>
                                    <option value="4">test12414</option>
                                </select>
                                <div>
                                    <h5 className="text-gray-800 font-bold border-b pb-3 mb-3">
                                        Discount
                                    </h5>
                                </div>
                                <form>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value="0S9IplqjhQE7nk5fI4TyFhEydXDcSlM59Clx6enI"
                                        autoComplete="off"
                                    />
                                    <div className="flex gap-2 mb-2">
                                        <input type="hidden" name="subtotal" id="subtotal" value="90" />
                                        <input
                                            type="text"
                                            className="block w-full p-2 border rounded"
                                            name="amount"
                                            id="amount"
                                            value=""
                                            required
                                            placeholder="Enter amount"
                                            aria-label="Enter amount"
                                        />
                                        <button
                                            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700"
                                            type="submit"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Payment Summary Card */}
                        <div className="bg-white shadow rounded mb-4">
                            <div className="p-4">
                                <div>
                                    <h5 className="font-bold border-b pb-3 mb-1">
                                        Payment summary
                                    </h5>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    <li className="flex justify-between font-semibold text-sm py-2">
                                        <span>Subtotal</span>
                                        <span>$90.00</span>
                                    </li>
                                    <li className="flex justify-between font-semibold text-sm py-2">
                                        <span>SGST</span>
                                        <span>$8.10</span>
                                    </li>
                                    <li className="flex justify-between font-semibold text-sm py-2">
                                        <span>CGST</span>
                                        <span>$8.10</span>
                                    </li>
                                    <li className="flex justify-between font-bold py-2">
                                        <span>Total Amount</span>
                                        <span>$106.20</span>
                                    </li>
                                </ul>
                                <div id="emsg"></div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 w-full justify-between">
                            <div className="w-full md:w-2/3">
                                <Link
                                    to="/admin/pos/items"
                                    className="w-full gap-2 flex items-center px-2 border rounded py-2 text-center text-gray-800 hover:bg-gray-100"
                                >
                                    <FaArrowLeft /> Continue Shopping
                                </Link>
                            </div>
                            <div className="">
                                <button onClick={() => setOpenOrderConfirmationModal(true)} className="bg-black whitespace-nowrap text-white px-4 py-2 rounded hover:bg-neutral-700">
                                    Place order
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </CommonLayout>
    );
}
