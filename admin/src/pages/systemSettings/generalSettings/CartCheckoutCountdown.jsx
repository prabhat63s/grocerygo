import { useState } from 'react';

const CartCheckoutCountdown = () => {
    const [isActive, setIsActive] = useState(true);
    const [countdownMessage, setCountdownMessage] = useState("{fire} Hurry up, these products are limited, checkout within {timer} minutes.");
    const [countdownExpiredMessage, setCountdownExpiredMessage] = useState("You are out of time! Checkout now to avoid losing your order!");
    const [countdownMins, setCountdownMins] = useState(1);

    const handleSwitchChange = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <div id="cart_checkout_countdown">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">Cart/Checkout countdown</h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="cart_checkout_countdown-switch"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="cart_checkout_countdown"
                                        value="1"
                                        checked={isActive}
                                        onChange={handleSwitchChange}
                                    />
                                    <label htmlFor="cart_checkout_countdown-switch" className="switch">
                                        <span className="switch__circle switch__circle"><span className="switch__circle-inner"></span></span>
                                        <span className="switch__left ps-2">OFF</span>
                                        <span className="switch__right pe-2">On</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label className="form-label fs-7 fw-500" htmlFor="countdown_message">
                                            Countdown Message
                                        </label>
                                        <span className="text-danger">*</span>
                                        <p className="text-muted">
                                            {/* Text that will be shown while timer is live. {fire} will be replaced by emoji, {timer} will be replaced by countdown timer. */}
                                        </p>
                                        <textarea
                                            className="form-control"
                                            name="countdown_message"
                                            placeholder="Countdown Message"
                                            required
                                            value={countdownMessage}
                                            onChange={(e) => setCountdownMessage(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="form-label fs-7 fw-500" htmlFor="countdown_expired_message">
                                            Countdown Expired Message
                                        </label>
                                        <span className="text-danger">*</span>
                                        <p className="text-muted">Text that will be shown when timer ends.</p>
                                        <textarea
                                            className="form-control"
                                            name="countdown_expired_message"
                                            placeholder="Countdown Expired Message"
                                            required
                                            value={countdownExpiredMessage}
                                            onChange={(e) => setCountdownExpiredMessage(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="col-form-label fs-7 fw-500" htmlFor="countdown_mins">
                                                Minutes
                                            </label>
                                            <span className="text-danger">*</span>
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                className="form-control"
                                                name="countdown_mins"
                                                id="countdown_mins"
                                                value={countdownMins}
                                                required
                                                onChange={(e) => setCountdownMins(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-3 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-sm-4"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CartCheckoutCountdown;
