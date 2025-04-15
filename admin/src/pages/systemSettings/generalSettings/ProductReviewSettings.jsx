import React, { useState } from 'react';

const ProductReviewSettings = () => {
  // State for review approved status and auto-approved ratings
  const [reviewApprovedStatus, setReviewApprovedStatus] = useState(true);
  const [autoApprovedRatings, setAutoApprovedRatings] = useState([5, 4, 3]);

  // Handle review approved status switch
  const handleReviewApprovedStatusChange = () => {
    setReviewApprovedStatus(!reviewApprovedStatus);
  };

  // Handle checkbox changes for auto-approved ratings
  const handleAutoApprovedRatingsChange = (value) => {
    setAutoApprovedRatings((prevRatings) =>
      prevRatings.includes(value)
        ? prevRatings.filter((rating) => rating !== value)
        : [...prevRatings, value]
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      reviewApprovedStatus,
      autoApprovedRatings,
    });
    // Form submission logic here (e.g., API call)
  };

  return (
    <div id="product_review">
      <div className="mb-3">
        <div className="w-full">
          <div className="card border-0 shadow-lg mt-20">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
              <div className="d-flex align-items-center card-header p-3 bg-secondary">
                <h5 className="text-lg flex-1">Review Settings</h5>
                <div className="flex items-center justify-end">
                  <input
                    id="review_approved_status-switch"
                    type="checkbox"
                    className="checkbox-switch"
                    name="review_approved_status"
                    value="1"
                    checked={reviewApprovedStatus}
                    onChange={handleReviewApprovedStatusChange}
                  />
                  <label htmlFor="review_approved_status-switch" className="switch">
                    <span className="switch__circle">
                      <span className="switch__circle-inner"></span>
                    </span>
                    <span className="switch__left ps-2">OFF</span>
                    <span className="switch__right pe-2">On</span>
                  </label>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold">Auto Approved:</label>
                    <div className="flex gap-4">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="me-2"
                            id={`checkbox${rating}`}
                            name="review_auto_approved[]"
                            value={rating}
                            checked={autoApprovedRatings.includes(rating)}
                            onChange={() => handleAutoApprovedRatingsChange(rating)}
                          />
                          {rating}.0
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button type="submit" className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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

export default ProductReviewSettings;
