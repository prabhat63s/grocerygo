import { useState } from "react";

const themes = [
  { id: 1, img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/theme/theme-1.png" },
  { id: 2, img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/theme/theme-2.png" },
  { id: 3, img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/theme/theme-3.png" },
  { id: 4, img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/theme/theme-4.png" },
  { id: 5, img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/theme/theme-5.png" },
];

export default function ThemeSettingsForm() {
  const [selectedTheme, setSelectedTheme] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save selected theme
    console.log("Selected theme:", selectedTheme);
  };

  return (
    <section id="theme" className="bg-white rounded shadow">
     <h2 className="text-xl font-semibold mb-4 p-2 bg-yellow-500 rounded-t-md">Theme Settings</h2>
     <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {themes.map((theme) => (
            <label
              key={theme.id}
              htmlFor={`template${theme.id}`}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden p-1 transition ${
                selectedTheme === theme.id ? "border-yellow-500 ring-2 ring-yellow-400" : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                id={`template${theme.id}`}
                name="template"
                value={theme.id}
                className="hidden"
                checked={selectedTheme === theme.id}
                onChange={() => setSelectedTheme(theme.id)}
              />
              <img src={theme.img} alt={`Theme ${theme.id}`} className="w-full h-28 object-cover rounded" />
            </label>
          ))}
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
