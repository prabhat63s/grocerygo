import { useState } from 'react';

const PixelSettings = () => {
    const [facebookPixelId, setFacebookPixelId] = useState('1816911008373861');
    const [twitterPixelId, setTwitterPixelId] = useState('67867868');
    const [linkedinPixelId, setLinkedinPixelId] = useState('5675756');
    const [googlePixelId, setGooglePixelId] = useState('97686786');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic goes here
    };

    return (
        <div id="pixel">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 box-shadow">
                        <div className="d-flex align-items-center card-header p-3 bg-secondary">
                            <h5>Pixel Settings</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                                <div className="row g-3">
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="facebook_pixcel_id" className="form-label">Facebook</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="facebook_pixcel_id"
                                            placeholder="Facebook Pixel Id"
                                            value={facebookPixelId}
                                            onChange={(e) => setFacebookPixelId(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="twitter_pixcel_id" className="form-label">Twitter</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="twitter_pixcel_id"
                                            placeholder="Twitter Pixel Id"
                                            value={twitterPixelId}
                                            onChange={(e) => setTwitterPixelId(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="linkedin_pixcel_id" className="form-label">LinkedIn</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="LinkedIn Pixel Id"
                                            name="linkedin_pixcel_id"
                                            value={linkedinPixelId}
                                            onChange={(e) => setLinkedinPixelId(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="googletag_pixcel_id" className="form-label">Google</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Google Pixel Id"
                                            name="googletag_pixcel_id"
                                            value={googlePixelId}
                                            onChange={(e) => setGooglePixelId(e.target.value)}
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

export default PixelSettings;
