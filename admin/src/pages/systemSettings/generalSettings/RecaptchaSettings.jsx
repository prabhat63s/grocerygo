import React, { useState } from 'react';

const RecaptchaSettings = () => {
  // State for reCAPTCHA version and other form fields
  const [recaptchaVersion, setRecaptchaVersion] = useState('v2');
  const [siteKey, setSiteKey] = useState('6LePaW8qAAAAAHxktIoC3ZSBrnugeGNUPg6j0VBA');
  const [secretKey, setSecretKey] = useState('6LePaW8qAAAAAEKo5PuTvBJ16yvbs5wgfUUKM9x0');
  const [scoreThreshold, setScoreThreshold] = useState('1.0');

  // Handle reCAPTCHA version change
  const handleVersionChange = (e) => {
    const selectedVersion = e.target.value;
    setRecaptchaVersion(selectedVersion);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form data
    const formData = {
      recaptcha_version: recaptchaVersion,
      google_recaptcha_site_key: siteKey,
      google_recaptcha_secret_key: secretKey,
      score_threshold: scoreThreshold,
    };
    console.log('Form Submitted:', formData);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div id="recaptcha">
      <div className="mb-5">
        <div className="w-full">
          <div className="card border-0 shadow-lg">
            <div className="d-flex align-items-center card-header p-3 bg-secondary">
              <h5>Google reCAPTCHA</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="hidden"
                  name="_token"
                  value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1"
                  autoComplete="off"
                />
                <div className="space-y-4">
                  {/* reCAPTCHA Version Selection */}
                  <div>
                    <label className="form-label text-sm font-semibold">
                      Google reCAPTCHA Version <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select w-full py-2 px-3 border rounded-md"
                      name="recaptcha_version"
                      value={recaptchaVersion}
                      onChange={handleVersionChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="v2">V2</option>
                      <option value="v3">V3</option>
                    </select>
                  </div>

                  {/* Site Key */}
                  <div>
                    <label className="form-label text-sm font-semibold">
                      Google reCAPTCHA Site Key <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-full py-2 px-3 border rounded-md"
                      name="google_recaptcha_site_key"
                      value={siteKey}
                      onChange={(e) => setSiteKey(e.target.value)}
                      placeholder="Google reCAPTCHA Site Key"
                      required
                    />
                  </div>

                  {/* Secret Key */}
                  <div>
                    <label className="form-label text-sm font-semibold">
                      Google reCAPTCHA Secret Key <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control w-full py-2 px-3 border rounded-md"
                      name="google_recaptcha_secret_key"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="Google reCAPTCHA Secret Key"
                      required
                    />
                  </div>

                  {/* Score Threshold (Only for V3) */}
                  {recaptchaVersion === 'v3' && (
                    <div>
                      <label className="form-label text-sm font-semibold">
                        Score Threshold <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control w-full py-2 px-3 border rounded-md"
                        name="score_threshold"
                        value={scoreThreshold}
                        onChange={(e) => setScoreThreshold(e.target.value)}
                        placeholder="Score Threshold"
                      />
                      <span className="text-muted text-xs">
                        <i>
                          reCAPTCHA v3 returns a score (1.0 is very likely a good
                          interaction, 0.0 is very likely a bot). If the score is less than or equal to
                          this threshold, the form submission will be blocked and the message above
                          will be displayed.
                        </i>
                      </span>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecaptchaSettings;
