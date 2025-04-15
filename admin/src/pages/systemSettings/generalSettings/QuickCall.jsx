import { useState } from 'react';

const QuickCall = () => {
    const [quickCallActive, setQuickCallActive] = useState(true);
    const [quickCallPosition, setQuickCallPosition] = useState("1");
    const [quickCallName, setQuickCallName] = useState("John Doe");
    const [quickCallDescription, setQuickCallDescription] = useState("Hey there 👋 Need help? I'm here for you, so just give me a call.");
    const [quickCallMobile, setQuickCallMobile] = useState("+917016428845");
    const [quickCallImage, setQuickCallImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setQuickCallImage(URL.createObjectURL(file));
        }
    };

    return (
        <div id="quick_call">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow mt-20">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">
                                    <i className="fa-solid fa-call fs-6"></i>
                                    Quick Call
                                </h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="quick_call-switch"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="quick_call"
                                        value="1"
                                        checked={quickCallActive}
                                        onChange={() => setQuickCallActive(!quickCallActive)}
                                    />
                                    <label htmlFor="quick_call-switch" className="switch">
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
                                            Quick Call Position
                                        </p>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="quick_call_position"
                                                id="quickradio"
                                                value="1"
                                                checked={quickCallPosition === "1"}
                                                onChange={() => setQuickCallPosition("1")}
                                            />
                                            <label htmlFor="quickradio" className="form-check-label">Left</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="quick_call_position"
                                                id="quickradio1"
                                                value="2"
                                                checked={quickCallPosition === "2"}
                                                onChange={() => setQuickCallPosition("2")}
                                            />
                                            <label htmlFor="quickradio1" className="form-check-label">Right</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label fs-7 fw-500" htmlFor="quick_call_name">
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="quick_call_name"
                                            value={quickCallName}
                                            onChange={(e) => setQuickCallName(e.target.value)}
                                            placeholder="Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label fs-7 fw-500" htmlFor="quick_call_description">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="quick_call_description"
                                            value={quickCallDescription}
                                            onChange={(e) => setQuickCallDescription(e.target.value)}
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label fs-7 fw-500" htmlFor="quick_call_mobile">
                                            Mobile <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="quick_call_mobile"
                                            value={quickCallMobile}
                                            onChange={(e) => setQuickCallMobile(e.target.value)}
                                            placeholder="Mobile"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label fs-7 fw-500" htmlFor="quick_call_image">
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="quick_call_image"
                                            onChange={handleImageChange}
                                        />
                                        {quickCallImage && (
                                            <img
                                                src={quickCallImage}
                                                alt="Quick Call"
                                                className="img-fluid rounded h-50px mt-1"
                                            />
                                        )}
                                    </div>
                                    <div className="form-group mt-3 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                            id="quick_call_update_btn"
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

export default QuickCall;
