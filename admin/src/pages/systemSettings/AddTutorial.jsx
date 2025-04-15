import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddTutorial() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch("/admin/tutorial/store", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        navigate("/admin/tutorial");
      } else {
        alert("Failed to save tutorial.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <ol className="text-2xl font-semibold flex gap-1 items-center">
            <li><Link to="/tutorial">Tutorial</Link></li>
            <li>/ Add New</li>
          </ol>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter tutorial title"
                required
                className="w-full border px-4 py-2 rounded"
              />

              <div className="mt-4">
                <label className="block mb-1 font-medium">
                  Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                  className="w-full border px-4 py-2 rounded"
                />
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mt-2 h-24 rounded border"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter tutorial description"
                rows="6"
                required
                className="w-full border px-4 py-2 rounded"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/tutorial"
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
