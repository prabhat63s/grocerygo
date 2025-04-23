import { useEffect, useState } from "react";
import CommonLayout from '../../components/layout/CommonLayout';
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useProduct } from "../../hook/useProduct";

export default function TopDeal() {
    const [fetchedTopDeals, setFetchedTopDeals] = useState([]);
    const { products, fetchAllProducts } = useProduct();
    const [dealType, setDealType] = useState("2");
    const [toggleTopDeal, setToggleTopDeal] = useState(true);
    const [offerType, setOfferType] = useState("2");
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const options = products.map((product) => ({
        value: product._id,
        label: product.name,
    }));

    const fetchTopDeals = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/top-deals`);
            setFetchedTopDeals(data);
        } catch (error) {
            console.error("Failed to fetch top deals", error);
        }
    };

    useEffect(() => {
        fetchTopDeals();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this top deal?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/top-deals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFetchedTopDeals(prev => prev.filter(deal => deal._id !== id));
            } catch (err) {
                console.error("Failed to delete top deal", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedProducts.length === 0) {
            alert("Please select at least one product.");
            return;
        }

        const startDate = document.querySelector('[name="top_deals_start_date"]')?.value || "";
        const endDate = document.querySelector('[name="top_deals_end_date"]')?.value || "";
        const startTime = document.querySelector('[name="top_deals_start_time"]')?.value || "";
        const endTime = document.querySelector('[name="top_deals_end_time"]')?.value || "";
        const discount = document.querySelector('[name="amount"]')?.value || "";

        const payload = {
            dealType,
            topDeal: toggleTopDeal,
            offerType,
            discountType: offerType === "1" ? "fixed" : "percentage",
            startDate,
            endDate,
            startTime,
            endTime,
            discount,
            products: selectedProducts.map((id) => ({ productId: id })),
        };

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/top-deals`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            fetchTopDeals(); // Refresh the list of top deals
        } catch (error) {
            console.error("Failed to save top deal", error);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const filteredTopDeals = fetchedTopDeals.filter(topDeal =>
        topDeal.products?.some(p =>
            p.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredTopDeals.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentTopDeals = filteredTopDeals.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Top Deal</h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block font-medium mb-1">Deals Type <span className="text-red-500">*</span></label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={dealType}
                                onChange={(e) => setDealType(e.target.value)}
                                required
                            >
                                <option value="1">One Time</option>
                                <option value="2">Daily</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Must-Have on Sale!</label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="top_deals_switch"
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={toggleTopDeal}
                                    onChange={() => setToggleTopDeal(!toggleTopDeal)}
                                />
                                <label htmlFor="top_deals_switch" className="cursor-pointer">
                                    {toggleTopDeal ? "On" : "Off"}
                                </label>
                            </div>
                        </div>

                        {toggleTopDeal && (
                            <>
                                <div>
                                    <label className="block font-medium mb-1">Start Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        name="top_deals_start_date"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">End Date <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        name="top_deals_end_date"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block font-medium mb-1">Start Time <span className="text-red-500">*</span></label>
                            <input
                                type="time"
                                name="top_deals_start_time"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">End Time <span className="text-red-500">*</span></label>
                            <input
                                type="time"
                                name="top_deals_end_time"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Discount Type <span className="text-red-500">*</span></label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={offerType}
                                onChange={(e) => setOfferType(e.target.value)}
                                required
                            >
                                <option value="1">Fixed</option>
                                <option value="2">Percentage</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Discount <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                name="amount"
                                placeholder="Discount"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Products</label>
                            <Select
                                isMulti
                                options={options}
                                value={options.filter((option) => selectedProducts.includes(option.value))}
                                onChange={(selected) =>
                                    setSelectedProducts(selected.map((option) => option.value))
                                }
                                className="w-full"
                            />
                        </div>

                        <div className="md:col-span-2 text-end">
                            <button
                                type="submit"
                                className="bg-black text-white px-5 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>

                <div className="p-4 bg-white rounded-md shadow">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
                        <div className="flex w-full gap-2">
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">Excel</button>
                            <button className="border py-2 w-full md:w-fit px-4 rounded-md text-sm bg-gradient-to-b from-gray-100 to-black/[0.1] hover:border-black">PDF</button>
                        </div>
                        <div className="flex items-center justify-between md:justify-end w-full gap-1">
                            <span>Search:</span>
                            <input
                                type="search"
                                placeholder="Search by product name"
                                className="border w-full md:w-fit px-4 py-1 rounded-md outline-none"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full text-sm border border-gray-200 rounded-md">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border px-4 py-2 text-left">#</th>
                                    <th className="border px-4 py-2 text-left">Products</th>
                                    <th className="border px-4 py-2 text-left">Created Date</th>
                                    <th className="border px-4 py-2 text-left">Updated Date</th>
                                    <th className="border px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTopDeals.map((deal, idx) => (
                                    <tr className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} key={deal._id}>
                                        <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                        <td className="border px-4 py-2">
                                            {deal.products?.map((prod) => prod.productId?.name).join(", ")}
                                        </td>
                                        <td className="border px-3 py-2">{new Date(deal.createdAt).toLocaleString()}</td>
                                        <td className="border px-3 py-2">{new Date(deal.updatedAt).toLocaleString()}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(deal._id)}
                                                className="text-red-500"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing{" "}
                            {currentTopDeals.length === 0
                                ? "0 to 0"
                                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, currentTopDeals.length)}`}{" "}
                            of {currentTopDeals.length} entries

                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}