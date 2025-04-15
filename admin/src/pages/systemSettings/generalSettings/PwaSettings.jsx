import { useState } from 'react';

const PwaSettings = () => {
    const [pwaEnabled, setPwaEnabled] = useState(true);
    const [appLogo, setAppLogo] = useState(null);
    const [appTitle, setAppTitle] = useState('GroceryGo');
    const [appName, setAppName] = useState('GroceryGo');
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [themeColor, setThemeColor] = useState('#e9bb24');

    const handleFileChange = (e) => {
        setAppLogo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div id="pwa">
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 box-shadow">
                        <div className="d-flex align-items-center card-header p-3 bg-secondary">
                            <h5>PWA Settings</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="row g-3">
                                    <div className="form-group col-sm-6">
                                        <label className="form-label" htmlFor="pwa-switch">PWA</label>
                                        <input
                                            id="pwa-switch"
                                            type="checkbox"
                                            className="checkbox-switch"
                                            name="pwa"
                                            value="1"
                                            checked={pwaEnabled}
                                            onChange={() => setPwaEnabled(!pwaEnabled)}
                                        />
                                        <label htmlFor="pwa-switch" className="switch">
                                            <span className="switch__circle">
                                                <span className="switch__circle-inner"></span>
                                            </span>
                                            <span className="switch__left ps-2">OFF</span>
                                            <span className="switch__right pe-2">On</span>
                                        </label>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className="form-label">App Logo <small>(512 x 512)</small></label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="app_logo"
                                            onChange={handleFileChange}
                                        />
                                        {appLogo && (
                                            <img
                                                className="img-fluid rounded hw-70 mt-1 object-fit-contain"
                                                src={URL.createObjectURL(appLogo)}
                                                alt="App Logo Preview"
                                            />
                                        )}
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className="form-label">App Title <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="app_title"
                                            value={appTitle}
                                            onChange={(e) => setAppTitle(e.target.value)}
                                            placeholder="App Title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className="form-label">App Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="app_name"
                                            value={appName}
                                            onChange={(e) => setAppName(e.target.value)}
                                            placeholder="App Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className="form-label">Background Color</label>
                                        <input
                                            type="color"
                                            className="form-control form-control-color w-100 border-0"
                                            name="background_color"
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className="form-label">Theme Color</label>
                                        <input
                                            type="color"
                                            className="form-control form-control-color w-100 border-0"
                                            name="theme_color"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="text-end mt-3">
                                    <button type="submit" className="btn btn-primary px-4">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PwaSettings;
