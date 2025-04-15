import { useState } from "react";

export default function SeoSettingsForm() {
    const [ogTitle, setOgTitle] = useState("GroceryGo: Your One-Stop Shop for Fresh Groceries (Delivered!)");
    const [ogImage, setOgImage] = useState("https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/about/og_image-638c6354d7b18.jpg");
    const [ogDescription, setOgDescription] = useState(
        "Skip the grocery store rush and fill your fridge with fresh groceries delivered straight to your door! GroceryGo is your convenient one-stop shop for all your grocery needs. Browse a wide selection of fresh produce, pantry staples, and household essentials, all from the comfort of your couch."
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOgImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle save logic here
        console.log({ ogTitle, ogDescription });
    };

    return (
        <section id="seo" className="bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4 p-2 bg-yellow-500 rounded-t-md">SEO Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">OG Title</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                            value={ogTitle}
                            onChange={(e) => setOgTitle(e.target.value)}
                            placeholder="OG Title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">OG Description</label>
                        <textarea
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
                            rows={6}
                            value={ogDescription}
                            onChange={(e) => setOgDescription(e.target.value)}
                            placeholder="OG Description"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">OG Image (1200 x 650)</label>
                    <input
                        type="file"
                        className="mt-1 block w-full text-sm"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {ogImage && (
                        <img src={ogImage} alt="OG Preview" className="mt-2 h-16 w-auto rounded border" />
                    )}
                </div>

                <div className="text-end pt-4">
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
}
