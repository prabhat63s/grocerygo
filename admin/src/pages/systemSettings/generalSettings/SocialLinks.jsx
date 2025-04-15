import { useState } from 'react';

const SocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState([
        {
            id: 1,
            icon: "fa-brands fa-facebook",
            link: "https://www.facebook.com"
        },
        {
            id: 2,
            icon: "fa-brands fa-instagram",
            link: "https://www.google.com/"
        },
        {
            id: 3,
            icon: "fa-brands fa-linkedin-in",
            link: "https://www.instagram.com/"
        },
        {
            id: 4,
            icon: "fa-brands fa-twitter",
            link: "https://www.instagram.com/"
        },
        {
            id: 10,
            icon: "fa-brands fa-pinterest",
            link: "https://www.pinterest.com"
        },
        {
            id: 11,
            icon: "fa-brands fa-tiktok",
            link: "https://www.tiktok.com"
        }
    ]);

    const handleDelete = (id) => {
        setSocialLinks(socialLinks.filter(link => link.id !== id));
    };

    const handleChange = (id, field, value) => {
        setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, [field]: value } : link));
    };

    return (
        <div id="social">
            <div className="row g-3 mb-4">
                <div className="col-12">
                    <div className="col-12">
                        <div className="card border-0 box-shadow">
                            <div className="d-sm-flex align-items-center justify-content-between card-header p-3 bg-secondary">
                                <h5>Social Links
                                    <span data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Ex. <i class='fa-solid fa-truck-fast'></i> Visit https://fontawesome.com/ for more info">
                                        <i className="fa-solid fa-circle-info"></i>
                                    </span>
                                </h5>
                                <button
                                    className="btn btn-primary px-4 mt-sm-0 mt-2"
                                    type="button"
                                    tooltip="ADD"
                                    onClick={() => setSocialLinks([...socialLinks, { id: Date.now(), icon: '', link: '' }])}
                                >
                                    <i className="fa-sharp fa-solid fa-plus"></i> Add New
                                </button>
                            </div>
                            <div className="card-body">
                                <form method="POST" action="https://grocerygo.infotechgravity.com/admin/social_links/update" enctype="multipart/form-data">
                                    <input type="hidden" name="_token" value="EPWMnGrqmCYxQEUoroZO2GCFEsylUzXarIrDHrb1" autoComplete="off" />
                                    {socialLinks.map((link) => (
                                        <div key={link.id} className="col-12 mb-2">
                                            <div className="row g-3">
                                                <input type="hidden" name="edit_icon_key[]" value={link.id} />
                                                <div className="col-md-6 form-group">
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control soaciallink_required"
                                                            onChange={(e) => handleChange(link.id, 'icon', e.target.value)}
                                                            value={link.icon}
                                                            placeholder="Icon"
                                                            required
                                                        />
                                                        <p className="input-group-text">
                                                            <i className={link.icon}></i>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 d-flex gap-2 align-items-center form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => handleChange(link.id, 'link', e.target.value)}
                                                        value={link.link}
                                                        placeholder="Link"
                                                        required
                                                    />
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        tooltip="Delete"
                                                        onClick={() => handleDelete(link.id)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group mt-3 text-end">
                                        <button className="btn btn-primary px-4" type="button">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialLinks;
