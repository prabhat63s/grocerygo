import { useState } from 'react';

const TawkSettings = () => {
    const [tawkOn, setTawkOn] = useState(true);
    const [widgetId, setWidgetId] = useState(`<script type="text/javascript">
var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src =
        'https://embed.tawk.to/65d7258a9131ed19d9700056/1hn86l9qi';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
</script>`);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div id="tawk_settings">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-flex align-items-center card-header p-3 bg-secondary">
                                <h5 className="col-md-6">Tawk to Settings</h5>
                                <div className="col-md-6 d-flex justify-content-end align-items-center">
                                    <input
                                        id="tawk_on_off"
                                        type="checkbox"
                                        className="checkbox-switch"
                                        name="tawk_on_off"
                                        value="1"
                                        checked={tawkOn}
                                        onChange={() => setTawkOn(!tawkOn)}
                                    />
                                    <label htmlFor="tawk_on_off" className="switch">
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
                                            <label className="col-form-label" htmlFor="tawk_widget_id">
                                                tawk.to Widget ID (Website Only)
                                                <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="tawk_widget_id"
                                                id="tawk_widget_id"
                                                placeholder="<script type=&quot;text/javascript&quot;></script>"
                                                value={widgetId}
                                                onChange={(e) => setWidgetId(e.target.value)}
                                            ></textarea>
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

export default TawkSettings;
