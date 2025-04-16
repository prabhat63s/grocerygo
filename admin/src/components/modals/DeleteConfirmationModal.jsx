// components/DeleteConfirmationModal.jsx
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const DeleteConfirmationModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg p-6 animate-slideDown">
        <BsExclamationCircle size={40} className="text-black mx-auto" />
        <h2 className="text-xl font-semibold text-center my-4">Are you sure?</h2>
        <p className="text-center text-gray-600 mb-4">You won't be able to revert this action.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-1.5 bg-gray-300 hover:bg-gray-400 rounded text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
