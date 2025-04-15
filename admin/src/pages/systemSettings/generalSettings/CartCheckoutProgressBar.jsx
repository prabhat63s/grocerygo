import { useState } from 'react';

const CartCheckoutProgressBar = () => {
    const [isActive, setIsActive] = useState(true);
    const [progressMessage, setProgressMessage] = useState("Spend {price} to get free shipping");
    const [progressMessageEnd, setProgressMessageEnd] = useState("Congratulations! You've got free shipping.");

    const handleSwitchChange = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <div id="cart_checkout_progressbar">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">Cart/Checkout progressbar</h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="cart_checkout_progressbar-switch"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="cart_checkout_progressbar"
                                        value="1"
                                        checked={isActive}
                                        onChange={handleSwitchChange}
                                    />
                                    <label htmlFor="cart_checkout_progressbar-switch" className="switch">
                                        <span className="switch__circle switch__circle"><span className="switch__circle-inner"></span></span>
                                        <span className="switch__left ps-2">OFF</span>
                                        <span className="switch__right pe-2">On</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label className="form-label fs-7 fw-500" htmlFor="progress_message">
                                            Progress message text
                                        </label>
                                        <span className="text-danger">*</span>
                                        {/* <p className="text-muted">Write your text for progress bar using {price} to replace with scripts</p> */}
                                        <textarea
                                            className="form-control"
                                            name="progress_message"
                                            placeholder="Progress message text"
                                            required
                                            value={progressMessage}
                                            onChange={(e) => setProgressMessage(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="form-label fs-7 fw-500" htmlFor="progress_message_end">
                                            Progress message end text
                                        </label>
                                        <span className="text-danger">*</span>
                                        <p className="text-muted">Text that will be shown when progressbar ends</p>
                                        <textarea
                                            className="form-control"
                                            name="progress_message_end"
                                            placeholder="Progress message end text"
                                            required
                                            value={progressMessageEnd}
                                            onChange={(e) => setProgressMessageEnd(e.target.value)}
                                        />
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

export default CartCheckoutProgressBar;
