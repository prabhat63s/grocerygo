import { useState } from 'react';

const ProductFakeView = () => {
    const [isFakeViewActive, setIsFakeViewActive] = useState(true);
    const [fakeViewMessage, setFakeViewMessage] = useState("{eye} {count} people are viewing this product right now");
    const [minViewCount, setMinViewCount] = useState(10);
    const [maxViewCount, setMaxViewCount] = useState(100);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div id="product_fake_view">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">
                                    <i className="fa-solid fa-call fs-6"></i>
                                    Product Fake View
                                </h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="product_fake_view-switch"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="product_fake_view"
                                        value="1"
                                        checked={isFakeViewActive}
                                        onChange={() => setIsFakeViewActive(!isFakeViewActive)}
                                    />
                                    <label htmlFor="product_fake_view-switch" className="switch">
                                        <span className="switch__circle switch__circle">
                                            <span className="switch__circle-inner"></span>
                                        </span>
                                        <span className="switch__left ps-2">OFF</span>
                                        <span className="switch__right pe-2">On</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label className="form-label fs-7 fw-500" htmlFor="fake_view_message">
                                            Message <span className="text-danger">*</span>
                                        </label>
                                        <p className="text-muted">
                                            Text that will be shown: <br />
                                            {/* - {eye} will be replaced by icon; <br /> */}
                                            {/* - {count} will be replaced by the calculated count between Min and Max values set below; */}
                                        </p>
                                        <textarea
                                            className="form-control"
                                            name="fake_view_message"
                                            placeholder="Message"
                                            value={fakeViewMessage}
                                            onChange={(e) => setFakeViewMessage(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="col-form-label fs-7 fw-500" htmlFor="min_view_count">
                                                Min Count <span className="text-danger">*</span>
                                            </label>
                                            <p className="text-muted">Set the minimum count of fake users viewing the product.</p>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="min_view_count"
                                                id="min_view_count"
                                                value={minViewCount}
                                                onChange={(e) => setMinViewCount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="col-form-label fs-7 fw-500" htmlFor="max_view_count">
                                                Max Count <span className="text-danger">*</span>
                                            </label>
                                            <p className="text-muted">Set the maximum count of fake users viewing the product.</p>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                name="max_view_count"
                                                id="max_view_count"
                                                value={maxViewCount}
                                                onChange={(e) => setMaxViewCount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mt-3 text-end">
                                        <button
                                            className="btn btn-primary px-4"
                                            id="product_fake_view_update_btn"
                                            type="submit"
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

export default ProductFakeView;
