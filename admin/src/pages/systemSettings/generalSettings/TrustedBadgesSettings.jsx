import React, { useState } from 'react';

const TrustedBadgesSettings = () => {
  const [badgeImage1, setBadgeImage1] = useState(null);
  const [badgeImage2, setBadgeImage2] = useState(null);
  const [badgeImage3, setBadgeImage3] = useState(null);
  const [badgeImage4, setBadgeImage4] = useState(null);

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));  // For previewing the selected image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      badgeImage1,
      badgeImage2,
      badgeImage3,
      badgeImage4,
    });
  };

  return (
    <div id="badges">
      <div className="mb-4">
        <div className="w-full">
          <div className="card border-0 shadow-lg mt-20">
            <form onSubmit={handleSubmit} action="https://grocerygo.infotechgravity.com/admin/settings/safe-secure-store" method="POST" encType="multipart/form-data">
              <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
              <div className="card-header bg-transparent py-3 flex justify-between items-center text-dark">
                <h5 className="text-lg px-2">Trusted Badges Settings</h5>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="form-group">
                        <label className="form-label block text-sm font-medium text-gray-700">
                          Trusted Badge Image {index}
                        </label>
                        <input
                          type="file"
                          className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                          name={`trusted_badge_image_${index}`}
                          onChange={(e) => handleFileChange(e, index === 1 ? setBadgeImage1 : index === 2 ? setBadgeImage2 : index === 3 ? setBadgeImage3 : setBadgeImage4)}
                        />
                        {index === 1 && badgeImage1 && (
                          <img className="img-fluid rounded h-40 mt-1" src={badgeImage1} alt={`Badge ${index}`} />
                        )}
                        {index === 2 && badgeImage2 && (
                          <img className="img-fluid rounded h-40 mt-1" src={badgeImage2} alt={`Badge ${index}`} />
                        )}
                        {index === 3 && badgeImage3 && (
                          <img className="img-fluid rounded h-40 mt-1" src={badgeImage3} alt={`Badge ${index}`} />
                        )}
                        {index === 4 && badgeImage4 && (
                          <img className="img-fluid rounded h-40 mt-1" src={badgeImage4} alt={`Badge ${index}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
  );
};

export default TrustedBadgesSettings;
