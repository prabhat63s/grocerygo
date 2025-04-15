import { useState } from 'react';

const AgeVerification = () => {
    const [ageVerificationOn, setAgeVerificationOn] = useState(false);
    const [popupType, setPopupType] = useState("1");
    const [minAge, setMinAge] = useState(18);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div id="age_verification">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">Age Verification</h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="age_verification-switch"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="age_verification_on_off"
                                        value="1"
                                        checked={ageVerificationOn}
                                        onChange={() => setAgeVerificationOn(!ageVerificationOn)}
                                    />
                                    <label htmlFor="age_verification-switch" className="switch">
                                        <span className="switch__circle"><span className="switch__circle-inner"></span></span>
                                        <span className="switch__left ps-2">OFF</span>
                                        <span className="switch__right pe-2">On</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <p className="form-label">Popup Type</p>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="popup_type"
                                                id="radio1"
                                                value="1"
                                                checked={popupType === "1"}
                                                onChange={() => setPopupType("1")}
                                                required
                                            />
                                            <label htmlFor="radio1" className="form-check-label">Default</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="popup_type"
                                                id="radio2"
                                                value="2"
                                                checked={popupType === "2"}
                                                onChange={() => setPopupType("2")}
                                                required
                                            />
                                            <label htmlFor="radio2" className="form-check-label">Enter DOB</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input form-check-input-secondary"
                                                type="radio"
                                                name="popup_type"
                                                id="radio3"
                                                value="3"
                                                checked={popupType === "3"}
                                                onChange={() => setPopupType("3")}
                                                required
                                            />
                                            <label htmlFor="radio3" className="form-check-label">Enter Age</label>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className="form-label">Minimum age <span className="text-danger"> *</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="min_age"
                                            value={minAge}
                                            onChange={(e) => setMinAge(e.target.value)}
                                            placeholder="Minimum age"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mt-3 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
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

export default AgeVerification;
