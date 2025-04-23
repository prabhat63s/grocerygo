import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

export default function AddVariantsModal({
  isOpen,
  onClose,
  setIsVariantsVisible,
  setVariants,
  setVariantName
}) {
  const [variantFields, setVariantFields] = useState([{ name: '', options: '' }]);

  const addVariantField = () => {
    setVariantFields([...variantFields, { name: '', options: '' }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...variantFields];
    updated[index][key] = value;
    setVariantFields(updated);
  };

  const cartesianProduct = (arrays) =>
    arrays.reduce((a, b) => a.flatMap(d => b.map(e => [...d, e])), [[]]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleaned = variantFields.map(v => ({
      name: v.name.trim(),
      options: v.options.split('|').map(opt => opt.trim()).filter(Boolean)
    }));

    const combos = cartesianProduct(cleaned.map(v => v.options));

    const generatedVariants = combos.map(combo => {
      const variantData = {};
      cleaned.forEach((v, i) => {
        variantData[v.name] = combo[i];
      });
      return {
        ...variantData,
        originalPrice: '',
        sellingPrice: '',
        stockQty: '',
        minQty: '',
        maxQty: '',
        lowQty: '',
        stockManagement: false,
        isAvailable: true,
      };
    });

    setVariants(generatedVariants);
    setVariantName(cleaned.map(v => v.name)); // array of column names
    setIsVariantsVisible(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white mx-4 rounded-xl shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h5 className="text-xl font-semibold">Add Variants</h5>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <MdClose size={20} />
          </button>
        </div>

        <form className="mt-4 space-y-4">
          {variantFields.map((field, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Variant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Size, Color"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                  className="mt-1 w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Variant Options</label>
                <input
                  type="text"
                  placeholder="e.g. S|M|L or Red|Blue"
                  value={field.options}
                  onChange={(e) => handleFieldChange(index, 'options', e.target.value)}
                  className="mt-1 w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={addVariantField}
              className="text-blue-600 hover:underline text-sm"
            >
              + Add Another Variant Field
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
                Generate Variants
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
