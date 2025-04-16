import { useEffect, useState } from 'react';
import axios from 'axios';

const useSubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  // fetch all subcategories
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subcategories`);
      setSubCategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // fetch a single subcategory by its ID
  const fetchSubCategoryById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/subcategories/${id}`);
      setSubCategory(res.data);
    } catch (err) {
      console.error("Error fetching subcategory:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // update a subcategory
  const updateSubCategory = async (id, updatedSubCategory) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/subcategories/${id}`,
        updatedSubCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSubCategories((prev) =>
        prev.map((sub) => (sub._id === id ? res.data.subCategory : sub))
      );
      return res.data;
    } catch (err) {
      console.error("Error updating subcategory:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // delete a subcategory
  const deleteSubCategory = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/subcategories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubCategories((prev) => prev.filter((sub) => sub._id !== id));
      return res.data;
    } catch (err) {
      console.error("Error deleting subcategory:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Create a new subcategory
  const createSubCategory = async (newSubCategory) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/subcategories`, newSubCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubCategories((prev) => [...prev, res.data.subCategory]);
      return res.data;
    } catch (err) {
      console.error("Error creating subcategory:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  return {
    subCategories,
    loading,
    error,
    subCategory,
    fetchSubCategories,
    fetchSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
    createSubCategory,
  };
};

export default useSubCategory;
