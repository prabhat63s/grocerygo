import { useState } from 'react';

const FakeSalesNotification = () => {
    const [notificationActive, setNotificationActive] = useState(true);
    const [salesNotificationPosition, setSalesNotificationPosition] = useState("1");
    const [productSource, setProductSource] = useState("1");
    const [nextTimePopup, setNextTimePopup] = useState(5000);
    const [notificationDisplayTime, setNotificationDisplayTime] = useState(2000);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
    };

    return (
        <div id="fake_sales_notification">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">
                                    <i className="fa-solid fa-call fs-6"></i>
                                    Fake Sale Notifications
                                </h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="fake_sales_notification-switch"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="fake_sales_notification"
                                        value="1"
                                        checked={notificationActive}
                                        onChange={() => setNotificationActive(!notificationActive)}
                                    />
                                    <label htmlFor="fake_sales_notification-switch" className="switch">
                                        <span className="switch__circle switch__circle"><span className="switch__circle-inner"></span></span>
                                        <span className="switch__left ps-2">OFF</span>
                                        <span className="switch__right pe-2">On</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <p className="form-label">
                                            Sale Notification Position
                                        </p>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="sales_notification_position"
                                                id="saleradio"
                                                value="1"
                                                checked={salesNotificationPosition === "1"}
                                                onChange={() => setSalesNotificationPosition("1")}
                                            />
                                            <label htmlFor="saleradio" className="form-check-label">Left</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="sales_notification_position"
                                                id="saleradio1"
                                                value="2"
                                                checked={salesNotificationPosition === "2"}
                                                onChange={() => setSalesNotificationPosition("2")}
                                            />
                                            <label htmlFor="saleradio1" className="form-check-label">Right</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label fs-7 fw-500" htmlFor="product_source">
                                            Product Source <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-control"
                                            name="product_source"
                                            id="product_source"
                                            value={productSource}
                                            onChange={(e) => setProductSource(e.target.value)}
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="1">All random products</option>
                                            <option value="2">All random orders products</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="col-form-label fs-7 fw-500" htmlFor="next_time_popup">
                                            Next Notification Display Time <span className="text-danger">*</span>
                                        </label>
                                        <p className="text-muted">If you want to use 1 second, enter 1000</p>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            name="next_time_popup"
                                            id="next_time_popup"
                                            value={nextTimePopup}
                                            onChange={(e) => setNextTimePopup(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label className="col-form-label fs-7 fw-500" htmlFor="notification_display_time">
                                            Notification Display Time <span className="text-danger">*</span>
                                        </label>
                                        <p className="text-muted">If you want to use 1 second, enter 1000</p>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            name="notification_display_time"
                                            id="notification_display_time"
                                            value={notificationDisplayTime}
                                            onChange={(e) => setNotificationDisplayTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mt-3 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                            id="fake_sales_notification_update_btn"
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

export default FakeSalesNotification;
