import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

const modulePermissionsMap = {
    Dashboard: ["View"],
    POS: ["View", "Add"],
    Orders: ["View"],
    Report: ["View"],
    Categories: ["View", "Add", "Edit", "Delete"],
    Subcategories: ["View", "Add", "Edit", "Delete"],
    Tax: ["View", "Add", "Edit", "Delete"],
    "Global Extras": ["View", "Add", "Edit", "Delete"],
    Items: ["View", "Add", "Edit", "Delete"],
    Products: ["View", "Add", "Edit", "Delete"],
    "Product Reviews": ["View", "Delete"],
    "import Products": ["View", "Add"],
    Shopify: ["View", "Add", "Edit", "Delete"],
    Sliders: ["View", "Add", "Edit", "Delete"],
    Banner: ["View", "Add", "Edit", "Delete"],
    Promocode: ["View", "Add", "Edit", "Delete"],
    Firebase: ["View", "Add", "Edit", "Delete"],
    "Top Deals": ["View", "Add", "Edit", "Delete"],
    "Working Hours": ["View", "Add", "Edit", "Delete"],
    "Custom Status": ["View", "Add", "Edit", "Delete"],
    "Payment Methods": ["View", "Add", "Edit", "Delete"],
    Testimonials: ["View", "Add", "Edit", "Delete"],
    Inquiries: ["View", "Delete"],
    "Why Choose Us": ["View", "Add", "Edit", "Delete"],
    Customers: ["View", "Add", "Edit", "Delete"],
    Drivers: ["View", "Add", "Edit", "Delete"],
    Roles: ["View", "Add", "Edit", "Delete"],
    Employees: ["View", "Add", "Edit", "Delete"],
    "Cms Pages": ["View", "Add", "Edit", "Delete"],
    Blogs: ["View", "Add", "Edit", "Delete"],
    "Our team": ["View", "Add", "Edit", "Delete"],
    Tutorial: ["View", "Add", "Edit", "Delete"],
    Faq: ["View", "Add", "Edit", "Delete"],
    Gallery: ["View", "Add", "Edit", "Delete"],
    "Email Subscriber": ["View", "Delete"],
    Settings: ["View", "Edit"],
    "Whatsapp Settings": ["View", "Edit"],
    Share: ["View"],
    "Language Settings": ["View", "Add", "Edit", "Delete"],
    "Addons Manager": ["View", "Add", "Edit", "Delete"],
    "Clear Cache": ["View"],
};

export default function AddEmployeeRoles() {
    const [roleName, setRoleName] = useState('');
    const [modules, setModules] = useState({});
    const navigate = useNavigate();
    const modulesList = Object.keys(modulePermissionsMap);

    const [checkAll, setCheckAll] = useState(false);

    const handleCheckAll = () => {
        setCheckAll(!checkAll);
        const updated = {};
        modulesList.forEach((mod) => {
            const perms = modulePermissionsMap[mod] || [];
            updated[mod] = {};
            perms.forEach((perm) => {
                updated[mod][perm] = !checkAll;
            });
        });
        setModules(updated);
    };


    const toggleAllPermissionsForModule = (module) => {
        const current = modules[module];
        const isAllChecked = modulePermissionsMap[module].every(
            (perm) => current?.[perm]
        );

        const updatedPerms = {};
        modulePermissionsMap[module].forEach((perm) => {
            updatedPerms[perm] = !isAllChecked;
        });

        setModules((prev) => ({
            ...prev,
            [module]: updatedPerms,
        }));
    };


    const togglePermission = (module, permission) => {
        setModules((prev) => {
            const modulePerms = prev[module] || {};
            return {
                ...prev,
                [module]: {
                    ...modulePerms,
                    [permission]: !modulePerms[permission],
                }
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: roleName,
            modules,
        };

        try {
            const res = await fetch('/admin/roles/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                navigate('/admin/roles');
            } else {
                alert('Failed to save role');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    return (
        <CommonLayout>
            <div className="w-full flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/roles">Employee Roles</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow w-full rounded-md p-6 space-y-6">
                    <div>
                        <label className="block font-medium mb-1">
                            Role Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                            placeholder="Enter role name"
                            className="w-full border px-3 py-2 rounded-md"
                        />
                    </div>

                    <h2 className="text-lg font-semibold border-t pt-4">Modules and Permissions</h2>
                    <div className="flex flex-wrap bg-gray-100 py-3 px-4 rounded-md">
                        <div className="w-1/2 sm:w-1/3 flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="checkall"
                                checked={checkAll}
                                onChange={handleCheckAll}
                                className="accent-black"
                            />
                            <label htmlFor="checkall" className="font-bold">
                                Modules
                            </label>
                        </div>
                        <div className="w-1/2 sm:w-2/3 flex items-center">
                            <label className="font-bold">Permissions</label>
                        </div>
                    </div>


                    <div className="flex w-full flex-col space-y-4 mt-5">
                        {modulesList.map((module) => (
                            <div key={module} className="flex w-full items-center justify-between px-2">
                                <h3 className="w-full md:w-1/3 flex whitespace-nowrap items-center gap-2 font-semibold text-sm mb-2">
                                    <input
                                        type="checkbox"
                                        checked={Object.values(modules[module] || {}).some(Boolean)}
                                        onChange={() => toggleAllPermissionsForModule(module)}
                                        className="accent-black"
                                    />
                                    {module}
                                </h3>
                                <div className="w-full md:w-2/3 flex flex-wrap gap-2">
                                    {modulePermissionsMap[module]?.map((perm) => (
                                        <label key={perm} className="flex items-center gap-2 pr-4 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={modules[module]?.[perm] || false}
                                                onChange={() => togglePermission(module, perm)}
                                                className="accent-black"
                                            />
                                            {perm}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            to="/admin/roles"
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
