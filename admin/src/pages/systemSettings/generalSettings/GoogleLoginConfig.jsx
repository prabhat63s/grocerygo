import React, { useState } from 'react';

const GoogleLoginConfig = () => {
  const [googleLoginEnabled, setGoogleLoginEnabled] = useState(true);
  const [googleClientId, setGoogleClientId] = useState('google_client_id');
  const [googleClientSecret, setGoogleClientSecret] = useState('google_client_secret');
  const [googleRedirectUrl, setGoogleRedirectUrl] = useState('https://your-domain.com/login/google/callback');

  const handleSwitchChange = () => {
    setGoogleLoginEnabled(!googleLoginEnabled);
  };

  const handleClientIdChange = (e) => {
    setGoogleClientId(e.target.value);
  };

  const handleClientSecretChange = (e) => {
    setGoogleClientSecret(e.target.value);
  };

  const handleRedirectUrlChange = (e) => {
    setGoogleRedirectUrl(e.target.value);
  };

  return (
    <div id="google-login" className="mb-6">
      <div className="w-full">
        <div className="card border-0 shadow-lg mt-20">
          <form
            action="https://grocerygo.infotechgravity.com/admin/settings/updategoogle"
            method="POST"
            encType="multipart/form-data"
          >
            <input
              type="hidden"
              name="_token"
              value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1"
              autoComplete="off"
            />
            <div className="card-header bg-transparent py-3 flex justify-between items-center text-dark">
              <h5 className="text-lg px-2">Google Login Configuration</h5>
              <input
                id="checkbox-switch-google"
                type="checkbox"
                className="checkbox-switch"
                name="google_login"
                value="1"
                checked={googleLoginEnabled}
                onChange={handleSwitchChange}
              />
              <label htmlFor="checkbox-switch-google" className="switch">
                <span className="switch__circle">
                  <span className="switch__circle-inner"></span>
                </span>
                <span className="switch__left ps-2">OFF</span>
                <span className="switch__right pe-2">On</span>
              </label>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label block text-sm font-medium text-gray-700">
                    Google Client ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                    name="google_client_id"
                    value={googleClientId}
                    onChange={handleClientIdChange} // Added onChange handler
                    placeholder="Google Client ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label block text-sm font-medium text-gray-700">
                    Google Client Secret ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                    name="google_client_secret"
                    value={googleClientSecret}
                    onChange={handleClientSecretChange} // Added onChange handler
                    placeholder="Google Client Secret ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label block text-sm font-medium text-gray-700">
                    Google Redirect URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                    name="google_redirect_url"
                    value={googleRedirectUrl}
                    onChange={handleRedirectUrlChange} // Added onChange handler
                    placeholder="Google Redirect URL"
                    required
                  />
                </div>

                <div className="form-group text-right mt-3">
                  <button
                    className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginConfig;
