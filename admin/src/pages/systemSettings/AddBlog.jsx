import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);

    try {
      const res = await fetch('/admin/blogs/store', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        navigate('/blogs');
      } else {
        alert('Failed to save blog.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/blogs">Blogs</Link> / Add New
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 shadow-md rounded-md space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full border px-4 py-2 rounded outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Description <span className="text-red-500">*</span></label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Description"
                  className="w-full border px-4 py-2 rounded outline-none"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/admin/blogs"
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
