import React, { useState } from 'react';

const AppSettings = () => {
  const [iosLink, setIosLink] = useState('https://www.apple.com/in/itunes/');
  const [androidLink, setAndroidLink] = useState('https://play.google.com/store/apps');
  const [appBottomImage, setAppBottomImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAppBottomImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic goes here
  };

  return (
    <div id="mobile">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="text-xl font-semibold mb-4 p-2 bg-yellow-500 rounded-t-md">Mobile App Settings</h2>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="ios" className="block text-sm font-medium text-gray-700">iOS App Link</label>
              <input
                type="text"
                id="ios"
                name="ios"
                value={iosLink}
                onChange={(e) => setIosLink(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="iOS App Link"
              />
            </div>
            <div className="form-group">
              <label htmlFor="android" className="block text-sm font-medium text-gray-700">Android App Link</label>
              <input
                type="text"
                id="android"
                name="android"
                value={androidLink}
                onChange={(e) => setAndroidLink(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Android App Link"
              />
            </div>

            <div className="form-group">
              <label htmlFor="app_bottom_image" className="block text-sm font-medium text-gray-700">App Bottom Image</label>
              <input
                type="file"
                id="app_bottom_image"
                name="app_bottom_image"
                onChange={handleImageChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {appBottomImage && (
                <img
                  src={appBottomImage}
                  alt="App Bottom"
                  className="mt-2 rounded-lg h-24 object-cover"
                />
              )}
            </div>
          </div>

          <div className="mt-4 text-right">
            <button
              type="submit"
              className="btn btn-primary px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppSettings;
