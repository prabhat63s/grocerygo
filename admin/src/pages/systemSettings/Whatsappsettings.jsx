import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';

export default function WhatsappSettings() {
  const [activeTab, setActiveTab] = useState("Whatsapp business API");
  const [sendOnOrderCreated, setSendOnOrderCreated] = useState(false);
  const [enableWhatsappChat, setEnableWhatsappChat] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp_number: "919499874557",
    message_type: "2",
    whatsapp_phone_number_id: "109087992245712",
    whatsapp_access_token: "EAAVIMtjwDLUBOZCcc0BelhZAI6qnLqqeCFkCSQGmWT7jpt8cguTHwAZCuYB0EGixKjuAMhhMaiApQ8jSOsuZCJsCW4GD0DJ0HMFh3LsCYMmof2miz9YlNweaM0QGnc4H2sQkQPCIBP6U46xjVANJgKEg1RVMbedf5a97CdQUrY3dXmoEE5PIwHZBXMMsXnanYiMvZCfGsy8NsRPEz1K2ZC4cjmQt1ZCpAj7KofUZD"
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    // Replace this with your actual form submission logic
    console.log("Saving WhatsApp settings", formData);
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="bg-gray-50 shadow rounded-md">
          {/* Tabs */}
          <div className="flex space-x-2 border-b p-4 overflow-auto">
            {["Whatsapp business API", "Whatsapp order message", "Order status update"].map(tab => (
              <button
                key={tab}
                className={`py-2 px-4 text-sm font-medium rounded-t-md whitespace-nowrap ${activeTab === tab
                  ? "bg-white border border-b-0"
                  : "bg-gray-100"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="p-6">
            {activeTab === "Whatsapp business API" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">
                      Whatsapp number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      placeholder="Whatsapp number"
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Message type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="message_type"
                      value={formData.message_type}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    >
                      <option value="">Select</option>
                      <option value="1">Automatic using API</option>
                      <option value="2">Manually</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Whatsapp phone number ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="whatsapp_phone_number_id"
                      value={formData.whatsapp_phone_number_id}
                      onChange={handleChange}
                      placeholder="Whatsapp phone number ID"
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Whatsapp access token <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="whatsapp_access_token"
                      value={formData.whatsapp_access_token}
                      onChange={handleChange}
                      placeholder="Whatsapp access token"
                      className="w-full border px-3 py-2 rounded-md"
                      required
                    />
                  </div>

                </div>
                {/* Save Button */}
                <div className="mt-6 text-right flex justify-end w-full">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-neutral-700"
                  >
                    Save
                  </button>
                </div>
              </>
            )}

            {activeTab === "Whatsapp order message" && (
              <div className="card-body space-y-6">
                {/* Order Variable Section */}
                <div>
                  <label className="form-label font-bold">Order variable</label>
                  <div className="grid grid-cols-1 mt-2 md:grid-cols-3 gap-4">
                    {/* Column 1 */}
                    <ul className="list-none space-y-1">
                      <li>Order No : <code className='text-[#dc3545] text-sm'>{'{order_no}'}</code></li>
                      <li>Payment type : <code className='text-[#dc3545] text-sm'>{'{payment_type}'}</code></li>
                      <li>Total Tax : <code className='text-[#dc3545] text-sm'>{'{total_tax}'}</code></li>
                      <li>Delivery charge : <code className='text-[#dc3545] text-sm'>{'{delivery_charge}'}</code></li>
                      <li>Discount amount : <code className='text-[#dc3545] text-sm'>{'{discount_amount}'}</code></li>
                      <li>Grand total : <code className='text-[#dc3545] text-sm'>{'{grand_total}'}</code></li>
                      <li>Address Type : <code className='text-[#dc3545] text-sm'>{'{address_type}'}</code></li>
                    </ul>
                    {/* Column 2 */}
                    <ul className="list-none space-y-1">
                      <li>Customer name : <code className='text-[#dc3545] text-sm'>{'{customer_name}'}</code></li>
                      <li>Customer mobile : <code className='text-[#dc3545] text-sm'>{'{customer_mobile}'}</code></li>
                      <li>Address : <code className='text-[#dc3545] text-sm'>{'{address}'}</code></li>
                      <li>City : <code className='text-[#dc3545] text-sm'>{'{city}'}</code></li>
                      <li>State : <code className='text-[#dc3545] text-sm'>{'{state}'}</code></li>
                      <li>Country : <code className='text-[#dc3545] text-sm'>{'{country}'}</code></li>
                      <li>Landmark : <code className='text-[#dc3545] text-sm'>{'{landmark}'}</code></li>
                      <li>Postal code : <code className='text-[#dc3545] text-sm'>{'{postal_code}'}</code></li>
                      <li>Delivery type : <code className='text-[#dc3545] text-sm'>{'{delivery_type}'}</code></li>
                    </ul>
                    {/* Column 3 */}
                    <ul className="list-none space-y-1">
                      <li>Notes : <code className='text-[#dc3545] text-sm'>{'{notes}'}</code></li>
                      <li>Item Variable : <code className='text-[#dc3545] text-sm'>{'{item_variable}'}</code></li>
                      <li>Store URL : <code className='text-[#dc3545] text-sm'>{'{store_url}'}</code></li>
                      <li>Track order URL : <code className='text-[#dc3545] text-sm'>{'{track_order_url}'}</code></li>
                    </ul>
                  </div>
                </div>

                {/* Item Variable Section */}
                <div>
                  <label className="form-label font-bold">Item variable</label>
                  <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
                    <ul className="list-none space-y-1">
                      <li>Item name : <code className='text-[#dc3545] text-sm'>{'{item_name}'}</code></li>
                      <li>QTY : <code className='text-[#dc3545] text-sm'>{'{qty}'}</code></li>
                      <li>Variants : <code className='text-[#dc3545] text-sm'>{'{variantsdata}'}</code></li>
                      <li>Item price : <code className='text-[#dc3545] text-sm'>{'{item_price}'}</code></li>
                      <li>
                        <input
                          type="text"
                          name="item_message"
                          className=" text-sm text-gray-500 mt-1 p-2 border rounded-md block w-full"
                          placeholder="labels.item_message"
                          defaultValue="🔵 {item_name} X  {qty}  {variantsdata} - {item_price}"
                          required
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Whatsapp Message Textarea */}
                <div>
                  <label className="form-label font-bold">
                    Whatsapp message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="mt-2 p-4 rounded-md w-full"
                    name="whatsapp_message"
                    rows="10"
                    required
                    defaultValue={`Hi,

        I would like to place an order 👇
        {delivery_type} Order No: {order_no}

        ---------------------------

        {item_variable}

        ---------------------------
        {total_tax}
        👉Delivery charge : {delivery_charge}
        👉Discount : - {discount_amount}
        ---------------------------
        📃 Total : {grand_total}
        ---------------------------
        📄 Comment :  {notes}

        ✅ Customer Info

        Customer name : {customer_name}
        Customer phone : {customer_mobile}

        📍 {address_type} : {address} , {city} , {state}, {country}, {landmark}, {postal_code}

        ---------------------------

        💳 Payment type : {payment_type}
        💳 Order type : {delivery_type}

        We will confirm your order upon receiving the message.

        Track your order 👇
        {track_order_url}

        Click here for next order 👇
        {store_url}`}
                  />
                </div>

                {/* Toggles & Radios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label w-40 mb-2 flex">Send message when order created</label>
                    <label className="relative inline-block w-14 h-7">
                      <input type="checkbox" className="opacity-0 w-0 h-0" checked={sendOnOrderCreated}
                        onChange={() => setSendOnOrderCreated(!sendOnOrderCreated)} />
                      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${sendOnOrderCreated ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                        <span className={`${sendOnOrderCreated ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                        <span className={`${!sendOnOrderCreated ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                        <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${sendOnOrderCreated ? 'translate-x-7' : ''}`} />
                      </span>
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <label className="form-label mb-2">Whatsapp Chat</label>
                    <label className="relative inline-block w-14 h-7">
                      <input type="checkbox" className="opacity-0 w-0 h-0" checked={enableWhatsappChat}
                        onChange={() => setEnableWhatsappChat(!enableWhatsappChat)}
                      />
                      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${enableWhatsappChat ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                        <span className={`${enableWhatsappChat ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                        <span className={`${!enableWhatsappChat ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                        <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${enableWhatsappChat ? 'translate-x-7' : ''}`} />
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="form-label">Whatsapp Chat Position</label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input type="radio" name="whatsapp_chat_position" value="1" defaultChecked />
                        <span className="ml-2">Left</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" name="whatsapp_chat_position" value="2" />
                        <span className="ml-2">Right</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-neutral-700"
                  >
                    Save
                  </button>
                </div>
              </div>

            )}

            {activeTab === "Order status update" && (
              <div className="card-body space-y-6">
                {/* Alert Box */}
                <div className="alert bg-yellow-100 text-yellow-800 border border-yellow-300 p-4 rounded-md flex items-start gap-2">
                  <i className="fa-regular fa-circle-exclamation mt-1" />
                  <span>
                    <strong>Order status message</strong> will only work if your message type settings are automatic using WhatsApp Business API.
                  </span>
                </div>

                {/* Order Variables */}
                <div>
                  <label className="form-label font-bold">Order variable</label>
                  <div className="grid grid-cols-1 md:grid-cols-4 mt-2 gap-4">
                    <ul className="list-none space-y-1">
                      <li>Order No : <code className='text-[#dc3545] text-sm'>{'{order_no}'}</code></li>
                    </ul>
                    <ul className="list-none space-y-1">
                      <li>Customer name : <code className='text-[#dc3545] text-sm'>{'{customer_name}'}</code></li>
                    </ul>
                    <ul className="list-none space-y-1">
                      <li>Track order URL : <code className='text-[#dc3545] text-sm'>{'{track_order_url}'}</code></li>
                    </ul>
                    <ul className="list-none space-y-1">
                      <li>Status : <code className='text-[#dc3545] text-sm'>{'{status}'}</code></li>
                    </ul>
                  </div>
                </div>

                {/* Status Message Textarea */}
                <div>
                  <label className="form-label font-bold">
                    Status Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="form-textarea w-full mt-2"
                    name="status_message"
                    rows="10"
                    required
                    defaultValue={`🛍️ Order Status Update 📦

        Hello {customer_name},

        We're excited to share the latest status of your order with us. Here are the details:

        📝 Order Number: #{order_no}

        📦 **Order Status**: {status}

        📌 **Tracking Information**:
           - You can track your order with the tracking number: #{order_no}.
           - Tracking Link: {track_order_url}

        If you have any questions or need assistance, feel free to reply to this message.

        We appreciate your business and hope you enjoy your purchase.

        Best regards`}
                  />
                </div>

                {/* Toggle */}
                <div>
                  <label className="form-label w-40 mb-2 flex">Send message when order created</label>
                  <label className="relative inline-block w-14 h-7">
                    <input type="checkbox" className="opacity-0 w-0 h-0" checked={sendOnOrderCreated}
                      onChange={() => setSendOnOrderCreated(!sendOnOrderCreated)} />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${sendOnOrderCreated ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                      <span className={`${sendOnOrderCreated ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                      <span className={`${!sendOnOrderCreated ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                      <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${sendOnOrderCreated ? 'translate-x-7' : ''}`} />
                    </span>
                  </label>
                </div>

                {/* Save Button */}
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-neutral-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
