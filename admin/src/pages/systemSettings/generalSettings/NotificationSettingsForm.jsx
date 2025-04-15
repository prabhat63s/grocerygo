import { useState } from "react";

export default function NotificationSettingsForm() {
  const [soundFile, setSoundFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(
    "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/notification/notification.mp3"
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSoundFile(file);
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to upload file or save config
    console.log("Saving notification sound:", soundFile);
  };

  return (
    <section id="notification" className="bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 p-2 bg-yellow-500 rounded-t-md">Notification Settings (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">Notification Sound (mp3 only)</label>
            <input
              type="file"
              accept="audio/mp3"
              className="mt-1 block w-full text-sm"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            {previewSrc && (
              <audio controls className="w-full">
                <source src={previewSrc} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
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
