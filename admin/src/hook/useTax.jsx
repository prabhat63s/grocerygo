import { useState, useEffect } from 'react';
import axios from 'axios';

const useTax = () => {
    const [taxes, setTaxes] = useState([]);
    const [tax, setTax] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const BASE_URL = `${import.meta.env.VITE_BASE_URL}/taxes`;

    // Fetch all taxes
    const fetchTaxes = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(BASE_URL);
            setTaxes(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Get one tax by ID
    const fetchTaxById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(`${BASE_URL}/${id}`);
            setTax(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    //   create a new tax
    const addTax = async (newTax) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.post(BASE_URL, newTax, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTaxes((prev) => [res.data.data, ...prev]);
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // toggle status of a category
    const handleToggleStatus = async (id) => {
        try {
            await axios.patch(`${import.meta.env.VITE_BASE_URL}/taxes/${id}/toggle-status`);

            fetchTaxes();
        } catch (err) {
            console.error("Status toggle failed:", err);
        }
    };

    // Update tax
    const updateTax = async (id, updatedTax) => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            const res = await axios.put(`${BASE_URL}/${id}`, updatedTax, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTaxes((prev) =>
                prev.map((item) => (item._id === id ? res.data.data : item))
            );
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete tax
    const deleteTax = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTaxes((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaxes();
    }, []);

    return {
        taxes,
        setTaxes,
        tax,
        loading,
        addTax,
        error,
        fetchTaxes,
        fetchTaxById,
        handleToggleStatus,
        updateTax,
        deleteTax,
    };
};

export default useTax;
