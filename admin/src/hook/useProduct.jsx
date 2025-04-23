import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/products`;

export const useProduct = () => {
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(BASE_URL);
            setProducts(data.products);
        } catch (err) {
            const message = err.response?.data?.message || "Error fetching products";
            setError(message);
            console.error("Fetch error:", message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`);
            setProducts(data.product);
        } catch (err) {
            const message = err.response?.data?.message || "Error fetching product";
            setError(message);
            console.error("Fetch product by ID error:", message);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (formData) => {
        setLoading(true);
        setError(null);
        console.log("Creating product with data:", formData);
        try {
            const { data } = await axios.post(BASE_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            return data.product;
        } catch (err) {
            const message = err.response?.data?.message || "Error creating product";
            setError(message);
            console.error("Create product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.put(`${BASE_URL}/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return data.product;
        } catch (err) {
            const message = err.response?.data?.message || "Error updating product";
            setError(message);
            console.error("Update product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            const message = err.response?.data?.message || "Error deleting product";
            setError(message);
            console.error("Delete product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`${BASE_URL}/search/query`, {
                params: { query },
            });
            setProducts(data.products || []);
        } catch (err) {
            const message = err.response?.data?.message || "Error searching products";
            setError(message);
            console.error("Search products error:", message);
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        fetchAllProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        searchProducts,
    };
};
