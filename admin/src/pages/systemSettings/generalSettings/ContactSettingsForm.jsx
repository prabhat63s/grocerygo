import { useState } from "react";

export default function ContactSettingsForm() {
  const [email, setEmail] = useState("infotechgravity@gmail.com");
  const [mobile, setMobile] = useState("+917016428845");
  const [address, setAddress] = useState("456 Park Avenue, New York, NY 10022");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here
    console.log({ email, mobile, address });
  };

  return (
    <section id="contact" className="bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 p-2 bg-yellow-500 rounded-t-md">Contact Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>
        </div>
        <div className="text-end pt-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
