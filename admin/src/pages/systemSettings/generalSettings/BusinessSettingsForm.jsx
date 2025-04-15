import { useState } from "react";

export default function BusinessSettingsForm() {
    const [currency, setCurrency] = useState("$");
    const [currencyPosition, setCurrencyPosition] = useState("1");
    const [currencySpace, setCurrencySpace] = useState("2");
    const [currencyFormat, setCurrencyFormat] = useState("2");
    const [decimalSeparator, setDecimalSeparator] = useState("1");
    const [timezone, setTimezone] = useState("Asia/Kolkata");
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loginRequired, setLoginRequired] = useState(true);
    const [checkoutLoginRequired, setCheckoutLoginRequired] = useState(false);
    const [onlineOrderSwitch, setOnlineOrderSwitch] = useState(true);
    const [dateFormat, setDateFormat] = useState("M d, Y");
    const [timeFormat, setTimeFormat] = useState("2");
    const [orderPrefix, setOrderPrefix] = useState("PITS");
    const [referralAmount, setReferralAmount] = useState("30");
    const [pickupDelivery, setPickupDelivery] = useState("1");
    const [maxOrderQty, setMaxOrderQty] = useState("15");
    const [minOrderAmount, setMinOrderAmount] = useState("10");
    const [maxOrderAmount, setMaxOrderAmount] = useState("10000");
    const [freeShippingAmount, setFreeShippingAmount] = useState("1000");
    const [shippingCharges, setShippingCharges] = useState("60");
    const [imageSizeLimit, setImageSizeLimit] = useState("2");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit form
        console.log({
            currency,
            currencyPosition,
            currencySpace,
            currencyFormat,
            decimalSeparator,
            timezone,
            maintenanceMode,
            loginRequired,
            checkoutLoginRequired,
            onlineOrderSwitch,
            dateFormat,
            timeFormat,
            orderPrefix,
            referralAmount,
            pickupDelivery,
            maxOrderQty,
            minOrderAmount,
            maxOrderAmount,
            freeShippingAmount,
            shippingCharges,
            imageSizeLimit,
        });
    };

    return (
        <section id="business" className="bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4 p-2 bg-yellow-500 rounded-t-md">Business Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">

                {/* Currency & Position */}
                <div className="grid md:grid-cols-4 gap-4">
                    <div>
                        <label className="label">Currency Symbol</label>
                        <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Currency Position</label>
                        <div className="flex gap-4">
                            <label><input type="radio" name="currencyPosition" value="1" checked={currencyPosition === "1"} onChange={() => setCurrencyPosition("1")} /> Left</label>
                            <label><input type="radio" name="currencyPosition" value="2" checked={currencyPosition === "2"} onChange={() => setCurrencyPosition("2")} /> Right</label>
                        </div>
                    </div>
                    <div>
                        <label className="label">Currency Space</label>
                        <div className="flex gap-4">
                            <label><input type="radio" name="currencySpace" value="1" checked={currencySpace === "1"} onChange={() => setCurrencySpace("1")} /> Yes</label>
                            <label><input type="radio" name="currencySpace" value="2" checked={currencySpace === "2"} onChange={() => setCurrencySpace("2")} /> No</label>
                        </div>
                    </div>
                    <div>
                        <label className="label">Currency Format</label>
                        <input type="number" value={currencyFormat} onChange={(e) => setCurrencyFormat(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                </div>

                {/* Timezone & Format */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="label">Decimal Separator</label>
                        <div className="flex gap-4">
                            <label><input type="radio" name="decimalSeparator" value="1" checked={decimalSeparator === "1"} onChange={() => setDecimalSeparator("1")} /> Dot</label>
                            <label><input type="radio" name="decimalSeparator" value="2" checked={decimalSeparator === "2"} onChange={() => setDecimalSeparator("2")} /> Comma</label>
                        </div>
                    </div>
                    <div>
                        <label className="label">Time Zone</label>
                        <select className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                            <option value="Asia/Kolkata">Asia/Kolkata (India)</option>
                            <option value="America/New_York">America/New_York</option>
                            <option value="Europe/London">Europe/London</option>
                            {/* Add more as needed */}
                        </select>
                    </div>
                    <div>
                        <label className="label">Date Format</label>
                        <select className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                            <option value="d M, Y">dd MMM, yyyy</option>
                            <option value="M d, Y">MMM dd, yyyy</option>
                            <option value="d-m-Y">dd-MM-yyyy</option>
                        </select>
                    </div>
                </div>

                {/* Toggles */}
                <div className="grid md:grid-cols-4 gap-4">
                    <label><input type="checkbox" checked={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} /> Maintenance Mode</label>
                    <label><input type="checkbox" checked={loginRequired} onChange={() => setLoginRequired(!loginRequired)} /> Login Required</label>
                    <label><input type="checkbox" checked={checkoutLoginRequired} onChange={() => setCheckoutLoginRequired(!checkoutLoginRequired)} /> Checkout Login Required</label>
                    <label><input type="checkbox" checked={onlineOrderSwitch} onChange={() => setOnlineOrderSwitch(!onlineOrderSwitch)} /> Online Order</label>
                </div>

                {/* Prefixes & Amounts */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Order Number Prefix</label>
                        <input type="text" value={orderPrefix} onChange={(e) => setOrderPrefix(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Referral Amount</label>
                        <input type="number" value={referralAmount} onChange={(e) => setReferralAmount(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="label">Pickup/Delivery</label>
                        <select value={pickupDelivery} onChange={(e) => setPickupDelivery(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300">
                            <option value="1">Both</option>
                            <option value="2">Delivery</option>
                            <option value="3">Takeaway</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Max Order Qty</label>
                        <input type="number" value={maxOrderQty} onChange={(e) => setMaxOrderQty(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Min Order Amount</label>
                        <input type="number" value={minOrderAmount} onChange={(e) => setMinOrderAmount(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Max Order Amount</label>
                        <input type="number" value={maxOrderAmount} onChange={(e) => setMaxOrderAmount(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Min Amount for Free Shipping</label>
                        <input type="number" value={freeShippingAmount} onChange={(e) => setFreeShippingAmount(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Shipping Charges</label>
                        <input type="number" value={shippingCharges} onChange={(e) => setShippingCharges(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                    <div>
                        <label className="label">Image Upload Size Limit (MB)</label>
                        <input type="number" value={imageSizeLimit} onChange={(e) => setImageSizeLimit(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300" />
                    </div>
                </div>

                <div className="text-end">
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded">
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
}
