import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';

export default function AddTeamMember() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    designation: '',
    fb: '',
    youtube: '',
    insta: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch('/admin/our-team/store', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        navigate('/our-team');
      } else {
        alert('Failed to save member');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <CommonLayout>
      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/our-team">Our Team</Link> / Add New
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow space-y-6" encType="multipart/form-data">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name <span className="text-red-500">*</span></label>
                <input name="name" type="text" value={form.name} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="Name" />
              </div>
              <div>
                <label className="block font-medium mb-1">Designation <span className="text-red-500">*</span></label>
                <input name="designation" type="text" value={form.designation} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="Designation" />
              </div>
              <div>
                <label className="block font-medium mb-1">Facebook Link <span className="text-red-500">*</span></label>
                <input name="fb" type="url" value={form.fb} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="Facebook URL" />
              </div>
              <div>
                <label className="block font-medium mb-1">YouTube Link <span className="text-red-500">*</span></label>
                <input name="youtube" type="url" value={form.youtube} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="YouTube URL" />
              </div>
              <div>
                <label className="block font-medium mb-1">Instagram Link <span className="text-red-500">*</span></label>
                <input name="insta" type="url" value={form.insta} onChange={handleChange} required className="w-full border px-4 py-2 rounded" placeholder="Instagram URL" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border px-4 py-2 rounded min-h-[120px]" placeholder="Description" />
              </div>
              <div>
                <label className="block font-medium mb-1">Image <span className="text-red-500">*</span></label>
                <input name="image" type="file" accept="image/*" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link to="/admin/our-team" className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600">Cancel</Link>
            <button type="submit" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700">Save</button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
