import { useState } from 'react';

const WizzChatSettings = () => {
    const [wizzChatOn, setWizzChatOn] = useState(true);
    const [chatSettings, setChatSettings] = useState(`<script id="chat-init" src="https://app.wizzchat.com/account/js/init.js?id=6505747"></script>`);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div id="wizz_chat_settings">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">Wizz Chat settings</h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="wizz_chat_on_off"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="wizz_chat_on_off"
                                        value="1"
                                        checked={wizzChatOn}
                                        onChange={() => setWizzChatOn(!wizzChatOn)}
                                    />
                                    <label htmlFor="wizz_chat_on_off" className="switch">
                                        <span className="switch__circle"><span className="switch__circle-inner"></span></span>
                                        <span className="switch__left ps-2">OFF</span>
                                        <span className="switch__right pe-2">On</span>
                                    </label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">
                                                Copy widget code from Wizzchat website and add here to set up Wizzchat live Support setting for customer{' '}
                                                <a href="https://app.wizzchat.com/" target="_blank" rel="noopener noreferrer">
                                                    Click Here
                                                </a>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="wizz_chat_settings"
                                                id="wizz_chat_settings"
                                                placeholder="<script type=&quot;text/javascript&quot;></script>"
                                                value={chatSettings}
                                                onChange={(e) => setChatSettings(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
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

export default WizzChatSettings;
