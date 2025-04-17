import { useState } from "react";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/products`;

export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const fetchAllProducts = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}?page=${page}`);
            console.log('Fetched products:', data);
            setProducts(data.products || []);
            setTotal(data.total || 0);
            setPage(data.page || 1);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.response?.data?.message || "Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (id) => {
        setLoading(true);
        console.log(`Fetching product with ID: ${id}`);
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`);
            setProduct(data);
            console.log("Fetched product:", data);
        } catch (err) {
            const message = err.response?.data?.message || "Error fetching product";
            setError(message);
            console.error("Fetch product by ID error:", message);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (formData, token) => {
        setLoading(true);
        console.log("Creating product with data:", formData);
        try {
            const { data } = await axios.post(BASE_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Created product:", data);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Error creating product";
            setError(message);
            console.error("Create product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, formData, token) => {
        setLoading(true);
        console.log(`Updating product ${id} with data:`, formData);
        try {
            const { data } = await axios.put(`${BASE_URL}/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Updated product:", data);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Error updating product";
            setError(message);
            console.error("Update product error:", message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id, token) => {
        setLoading(true);
        console.log(`Deleting product with ID: ${id}`);
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Product deleted:", id);
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
        console.log(`Searching products with query: ${query}`);
        try {
            const { data } = await axios.get(`${BASE_URL}/search/query`, {
                params: { query },
            });
            setProducts(data);
            console.log("Search results:", data);
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
        product,
        loading,
        error,
        fetchAllProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        searchProducts,
        total,
        page,
    };
};
