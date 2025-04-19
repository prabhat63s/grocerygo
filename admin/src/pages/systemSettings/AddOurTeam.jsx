import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function AddTeamMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: '',
    designation: '',
    facebook: '',
    youtube: '',
    instagram: '',
    description: '',
    teamImage: null,
  });

  const [existingImage, setExistingImage] = useState('');

  // Fetch member details if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/team/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            name: data.name,
            designation: data.designation,
            facebook: data.facebook,
            youtube: data.youtube,
            instagram: data.instagram,
            description: data.description,
            teamImage: null,
          });
          setExistingImage(data.teamImage);
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to load team member');
        });
    }
  }, [id]);

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
    formData.append('name', form.name);
    formData.append('designation', form.designation);
    formData.append('facebook', form.facebook);
    formData.append('youtube', form.youtube);
    formData.append('instagram', form.instagram);
    formData.append('description', form.description);
    if (form.teamImage) formData.append('teamImage', form.teamImage);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      let res;
      if (id) {
        res = await axios.put(`${import.meta.env.VITE_BASE_URL}/team/${id}`, formData, config);
      } else {
        res = await axios.post(`${import.meta.env.VITE_BASE_URL}/team`, formData, config);
      }

      if (res.status === 200 || res.status === 201) {
        navigate('/admin/our-team');
      } else {
        alert('Failed to save team member');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <CommonLayout>
      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/our-team">Our Team</Link> / {id ? 'Edit' : 'Add New'}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow space-y-6"
          encType="multipart/form-data"
        >
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
                <label className="block font-medium mb-1">Facebook Link</label>
                <input name="facebook" type="url" value={form.facebook} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Facebook URL" />
              </div>
              <div>
                <label className="block font-medium mb-1">YouTube Link</label>
                <input name="youtube" type="url" value={form.youtube} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="YouTube URL" />
              </div>
              <div>
                <label className="block font-medium mb-1">Instagram Link</label>
                <input name="instagram" type="url" value={form.instagram} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Instagram URL" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border px-4 py-2 rounded min-h-[120px]" placeholder="Description" />
              </div>
              <div>
                <label className="block font-medium mb-1">Image {id ? '' : <span className="text-red-500">*</span>}</label>
                <input name="teamImage" type="file" accept="image/*" required onChange={handleChange} className="w-full border px-4 py-2 rounded" />
                {existingImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Current image:</p>
                    <img src={existingImage} alt="Current" className="h-24 mt-1 rounded shadow" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link to="/our-team" className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600">Cancel</Link>
            <button type="submit" className="bg-black text-white px-5 py-2 rounded hover:bg-neutral-700">
              {id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
