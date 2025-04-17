import { useEffect, useState } from 'react';
import axios from 'axios';

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  // fetch all categories
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

  // fetch a single category by its ID
  const fetchCategoryById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/${id}`);
      setCategory(res.data);
    } catch (err) {
      console.error("Error fetching category:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // update a category
  const updateCategory = async (id, updatedCategory) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/categories/${id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? res.data.category : cat))
      );
      return res.data;
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // toggle status of a category
  const handleToggleStatus = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/categories/${id}/toggle-status`);

      fetchCategories();
    } catch (err) {
      console.error("Status toggle failed:", err);
    }
  };

  // delete a category
  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      return res.data;
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async (newCategory) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/categories`, newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setCategories((prev) => [...prev, res.data.category]);
      return res.data;
    } catch (err) {
      console.error("Error creating category:", err);
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
    handleToggleStatus,
    fetchCategoryById,
    updateCategory,
    deleteCategory,
    createCategory,
  };
};

export default useCategory;
