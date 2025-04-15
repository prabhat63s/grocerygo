import React, { useState } from 'react';

const FacebookLoginConfig = () => {
  const [facebookLoginEnabled, setFacebookLoginEnabled] = useState(true);
  const [facebookClientId, setFacebookClientId] = useState('facebook_client_id');
  const [facebookClientSecret, setFacebookClientSecret] = useState('facebook_client_secret');
  const [facebookRedirectUrl, setFacebookRedirectUrl] = useState('https://your-domain.com/login/facebook/callback');

  const handleSwitchChange = () => {
    setFacebookLoginEnabled(!facebookLoginEnabled);
  };

  const handleClientIdChange = (e) => {
    setFacebookClientId(e.target.value);
  };

  const handleClientSecretChange = (e) => {
    setFacebookClientSecret(e.target.value);
  };

  const handleRedirectUrlChange = (e) => {
    setFacebookRedirectUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      facebookLoginEnabled,
      facebookClientId,
      facebookClientSecret,
      facebookRedirectUrl,
    });
  };

  return (
    <div id="facebook-login">
      <div className="mb-4">
        <div className="w-full">
          <div className="card border-0 shadow-lg mt-20">
            <form
              onSubmit={handleSubmit}
              action="https://grocerygo.infotechgravity.com/admin/settings/updatefb"
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
                <h5 className="text-lg px-2">Facebook Login Configuration</h5>
                <input
                  id="checkbox-switch-facebook"
                  type="checkbox"
                  className="checkbox-switch"
                  name="facebook_login"
                  value="1"
                  checked={facebookLoginEnabled}
                  onChange={handleSwitchChange}
                />
                <label htmlFor="checkbox-switch-facebook" className="switch">
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
                      Facebook Client ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                      name="facebook_client_id"
                      value={facebookClientId}
                      onChange={handleClientIdChange}
                      placeholder="Facebook Client ID"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-gray-700">
                      Facebook Client Secret ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                      name="facebook_client_secret"
                      value={facebookClientSecret}
                      onChange={handleClientSecretChange}
                      placeholder="Facebook Client Secret ID"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-gray-700">
                      Facebook Redirect URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                      name="facebook_redirect_url"
                      value={facebookRedirectUrl}
                      onChange={handleRedirectUrlChange}
                      placeholder="Facebook Redirect URL"
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
    </div>
  );
};

export default FacebookLoginConfig;
