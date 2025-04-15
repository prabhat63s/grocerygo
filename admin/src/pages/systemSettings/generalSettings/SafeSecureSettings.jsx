import React, { useState } from 'react';

const SafeSecureSettings = () => {
  const [paymentSelections, setPaymentSelections] = useState({
    4: true,
    1: false,
    5: false,
    3: false,
    2: true,
    6: false,
    7: true,
    8: false,
    9: false,
    10: true,
    11: false,
    12: false,
    13: true,
    14: false,
    15: true,
    16: false,
  });

  const [checkoutText, setCheckoutText] = useState("Your Payment is 100% Secure");
  const [checkoutTextColor, setCheckoutTextColor] = useState("#bf1d1d");

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setPaymentSelections((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleCheckoutTextChange = (e) => {
    setCheckoutText(e.target.value);
  };

  const handleCheckoutTextColorChange = (e) => {
    setCheckoutTextColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here (e.g., API call)
    console.log({
      paymentSelections,
      checkoutText,
      checkoutTextColor,
    });
  };

  return (
    <div id="secure">
      <div className="mb-4">
        <div className="w-full">
          <div className="card border-0 shadow-lg mt-20">
            <form onSubmit={handleSubmit} action="https://grocerygo.infotechgravity.com/admin/settings/safe-secure-store" method="POST" encType="multipart/form-data">
              <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
              <div className="card-header bg-transparent py-3 flex justify-between items-center text-dark">
                <h5 className="text-lg px-2">Safe & Secure Settings</h5>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-gray-700">
                      Safe & Secure Checkout Payment Selection
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[4, 1, 5, 3, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((id) => (
                        <div key={id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={id}
                            name="safe_secure_checkout_payment_selection[]"
                            checked={paymentSelections[id]}
                            onChange={handleCheckboxChange}
                            disabled={id === 1 || id === 5 || id === 3 || id === 6 || id === 8 || id === 9 || id === 11 || id === 12 || id === 14 || id === 16}  // Disable specific payment methods
                          />
                          <label className="form-check-label fw-bolder" htmlFor={id}>
                            {id === 4 && "Stripe"}
                            {id === 1 && "COD"}
                            {id === 5 && "Flutterwave"}
                            {id === 3 && "RazorPay"}
                            {id === 2 && "Wallet"}
                            {id === 6 && "Paystack"}
                            {id === 7 && "MercadoPago"}
                            {id === 8 && "MyFatoorah"}
                            {id === 9 && "PayPal"}
                            {id === 10 && "ToyyibPay"}
                            {id === 11 && "Paytab"}
                            {id === 12 && "Phonepe"}
                            {id === 13 && "Mollie"}
                            {id === 14 && "Khalti"}
                            {id === 15 && "Xendit"}
                            {id === 16 && "Bank Transfer"}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-gray-700">Safe & Secure Checkout Text</label>
                    <input
                      type="text"
                      className="form-control w-full px-4 py-2 border border-gray-300 rounded-md"
                      name="safe_secure_checkout_text"
                      value={checkoutText}
                      onChange={handleCheckoutTextChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-gray-700">Safe & Secure Checkout Text Color</label>
                    <input
                      type="color"
                      className="form-control form-control-color w-100 border-0"
                      name="safe_secure_checkout_text_color"
                      value={checkoutTextColor}
                      onChange={handleCheckoutTextColorChange}
                    />
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

export default SafeSecureSettings;
