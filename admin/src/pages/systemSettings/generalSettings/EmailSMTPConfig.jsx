import React, { useState } from 'react';

const EmailSMTPConfig = () => {
  const [formData, setFormData] = useState({
    mailDriver: 'SMTP',
    mailHost: 'smtp.gmail.com',
    mailPort: '587',
    mailUsername: 'infogravity2022@gmail.com',
    mailPassword: 'vopumcetyxasfyux',
    mailEncryption: 'tls',
    mailFromAddress: 'infotechgravity@gmail.com',
    mailFromName: 'Gravity'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
  };

  const handleTestMail = () => {
    // Test mail sending logic
  };

  return (
    <div id="smtp">
      <div className="mb-4">
        <div className="card border-0 shadow-lg mt-20">
          <div className="card-header bg-transparent py-3 flex items-center text-dark">
            <h5 className="px-2">Email SMTP Configuration</h5>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="mailDriver" className="block text-sm font-medium text-gray-700">
                    Mail Driver <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailDriver"
                    name="mailDriver"
                    value={formData.mailDriver}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail Driver"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailHost" className="block text-sm font-medium text-gray-700">
                    Mail Host <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailHost"
                    name="mailHost"
                    value={formData.mailHost}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail Host"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailPort" className="block text-sm font-medium text-gray-700">
                    Mail Port <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailPort"
                    name="mailPort"
                    value={formData.mailPort}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail Port"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailUsername" className="block text-sm font-medium text-gray-700">
                    Mail Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailUsername"
                    name="mailUsername"
                    value={formData.mailUsername}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail Username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailPassword" className="block text-sm font-medium text-gray-700">
                    Mail Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailPassword"
                    name="mailPassword"
                    value={formData.mailPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail Password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailEncryption" className="block text-sm font-medium text-gray-700">
                    Mail Encryption <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailEncryption"
                    name="mailEncryption"
                    value={formData.mailEncryption}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail Encryption"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailFromAddress" className="block text-sm font-medium text-gray-700">
                    Mail From Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailFromAddress"
                    name="mailFromAddress"
                    value={formData.mailFromAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail From Address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mailFromName" className="block text-sm font-medium text-gray-700">
                    Mail From Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mailFromName"
                    name="mailFromName"
                    value={formData.mailFromName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mail From Name"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={handleTestMail}
                  className="btn btn-success px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Send Test Mail
                </button>

                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSMTPConfig;
