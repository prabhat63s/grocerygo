import { useEffect, useState } from 'react';
import axios from 'axios';

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
      setCategories(res.data);

    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single category by its ID
  const fetchCategoryById = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/${id}`);
      setCategory(res.data);  // Store the fetched category

    } catch (err) {
      console.error("Error fetching category:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Update a category
  const updateCategory = async (id, updatedCategory) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/categories/${id}`, updatedCategory);
      // Optionally update the categories state to reflect the changes
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? res.data.category : cat))
      );

      return res.data;  // Return the updated category data if needed

    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // Or wherever you store the token
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove the deleted category from the list of categories
      setCategories((prev) => prev.filter((cat) => cat._id !== id));

      return res.data;  // Return the success message or data

    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    category,
    fetchCategories,
    fetchCategoryById,
    updateCategory,
    deleteCategory,
  };
};

export default useCategory;
