import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonLayout from '../../components/layout/CommonLayout';
import useTax from '../../hook/useTax';
import { toast } from 'sonner';

export default function AddTax() {
  const { id } = useParams();
  const {
    taxes,
    updateTax,
    addTax,
  } = useTax();
  // Initialize form state with name, type, and tax fields
  const [formData, setFormData] = useState({
    name: '',
    taxType: '',
    tax: '',
  });

  const navigate = useNavigate();

  // Handle input changes for text and select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission; process form data and navigate back if needed
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await updateTax(formData.id, formData);
        toast.success('Updated saved successfully');
      } else {
        await addTax(formData);
        toast.success('Created saved successfully');
      }

      navigate('/admin/tax');
    } catch (error) {
      console.error("Failed to save tax:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (id && taxes.length > 0) {
      const editingTax = taxes.find((t) => t._id === id);
      if (editingTax) {
        setFormData({
          id: editingTax._id,
          name: editingTax.name,
          taxType: editingTax.taxType,
          tax: editingTax.tax,
        });
      }
    }
  }, [id, taxes]);

  // Handle cancel action
  const handleCancel = () => {
    navigate('/admin/tax');
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
          <h1 className="text-2xl font-semibold">
            <Link to="/admin/tax">Tax</Link> / {id ? 'Update' : 'Add New'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block mb-1 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
              />
            </div>

            {/* Type Field */}
            <div>
              <label className="block mb-1 font-medium">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="taxType"
                value={formData.taxType}
                onChange={handleInputChange}
                required
                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
              >
                <option value="">Select</option>
                <option value="1">Fixed ($)</option>
                <option value="2">Percentage (%)</option>
              </select>

            </div>

            {/* Tax Field */}
            <div>
              <label className="block mb-1 font-medium">
                Tax <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tax"
                placeholder="Tax"
                value={formData.tax}
                onChange={handleInputChange}
                required
                className="w-full mt-2 border border-gray-300 rounded px-3 py-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
}
