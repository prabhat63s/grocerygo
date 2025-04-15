import { useState } from "react";
import CommonLayout from '../../components/layout/CommonLayout'
import Select from "react-select";
import { FaEdit, FaTrash, FaArrowsAlt, FaCheck } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";


export default function TopDeal() {
    const [dealType, setDealType] = useState("2");
    const [topDeal, setTopDeal] = useState(true);
    const [offerType, setOfferType] = useState("2");
    const [selectedProducts, setSelectedProducts] = useState([]);

    const products = [
        { id: 1, name: "Sinduri Mango" },
        { id: 2, name: "Pineapple (1 piece)" },
        { id: 3, name: "Kiran Watermelon" },
        { id: 4, name: "Banana (3 pieces)" },
        { id: 5, name: "Green Grapes" },
    ];

    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
    }));

    const handleSubmit = () => {
        console.log({
            dealType,
            topDeal,
            offerType,
            selectedProducts,
        });
    };

    const initialData = [
        { id: 1, product: "Pineapple (1 piece)", created: "May 21, 2024 11:08 AM", updated: "Apr 08, 2025 08:10 PM" },
        { id: 2, product: "Green Grapes", created: "May 21, 2024 11:22 AM", updated: "Apr 09, 2025 02:40 AM" },
        { id: 3, product: "Hybrid Tomato", created: "May 21, 2024 11:37 AM", updated: "Apr 08, 2025 04:50 AM" },
        { id: 4, product: "Let's Try Ragi Kaju Pista Cookies", created: "Jun 18, 2024 11:05 AM", updated: "Apr 05, 2025 04:14 PM" },
        { id: 5, product: "Meatzza Fresh Mince Chicken Keema (Frozen)", created: "Jun 19, 2024 06:48 AM", updated: "Apr 09, 2025 03:22 AM" },
        { id: 6, product: "Chicken Wings With Skin -500gm", created: "Jun 19, 2024 07:28 AM", updated: "Apr 07, 2025 09:49 AM" },
        { id: 7, product: "Lay's India's Magic Masala Potato Chips (40 g)", created: "Jun 19, 2024 07:51 AM", updated: "Apr 06, 2025 04:33 PM" },
        { id: 8, product: "Nescafe Classic Instant Coffee - Pack of 60 Sachet", created: "Jun 19, 2024 07:57 AM", updated: "Apr 08, 2025 11:06 AM" },
        { id: 9, product: "Red Bull Energy Drink", created: "Jun 21, 2024 10:15 AM", updated: "Apr 08, 2025 11:26 AM" },
        { id: 10, product: "Amul Gold Full Cream Fresh Milk", created: "Jun 21, 2024 11:09 AM", updated: "Apr 05, 2025 02:22 AM" },
    ];

    const [sliders, setSliders] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Filter categories based on search
    const filteredSliders = sliders.filter(slider =>
        slider.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSliders.length / rowsPerPage);
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    // Only show the rows on the current page
    const currentSliders = filteredSliders.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    // When dragging, use the offset based on pagination to compute the full list indices.
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        // Copy the full categories list
        const updatedCategories = [...sliders];
        // Compute the "real" source and destination indices in the full list
        const sourceIndex = indexOfFirst + result.source.index;
        const destinationIndex = indexOfFirst + result.destination.index;

        // Remove the dragged item from its original position
        const [removed] = updatedCategories.splice(sourceIndex, 1);
        // Insert it at the new position
        updatedCategories.splice(destinationIndex, 0, removed);

        setSliders(updatedCategories);
    };

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Top Deal</h1>
                </div>
                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block font-medium mb-1">
                                Deals Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={dealType}
                                onChange={(e) => setDealType(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
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
                                    checked={topDeal}
                                    onChange={() => setTopDeal(!topDeal)}
                                />
                                <label htmlFor="top_deals_switch" className="cursor-pointer">
                                    {topDeal ? "On" : "Off"}
                                </label>
                            </div>
                        </div>

                        {topDeal && (
                            <>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="top_deals_start_date"
                                        className="w-full border rounded px-3 py-2"
                                        defaultValue="2024-10-28"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        End Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="top_deals_end_date"
                                        className="w-full border rounded px-3 py-2"
                                        defaultValue="2024-10-29"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block font-medium mb-1">
                                Start Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="top_deals_start_time"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="01:44:00"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                End Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="top_deals_end_time"
                                className="w-full border rounded px-3 py-2"
                                defaultValue="19:01:00"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Discount Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={offerType}
                                onChange={(e) => setOfferType(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="1">Fixed</option>
                                <option value="2">Percentage</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Discount <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                name="amount"
                                placeholder="Discount"
                                defaultValue="20"
                            />
                        </div>


                        <div>
                            <label className="block font-medium mb-1">
                                Products
                            </label>
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
                                type="button"
                                className="bg-black text-white px-5 py-2 rounded"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>

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
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <table className="min-w-full text-sm border border-gray-200 rounded-md">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border px-4 py-2 text-left"></th>
                                        <th className="border px-4 py-2 text-left">#</th>
                                        <th className="border px-4 py-2 text-left">Products</th>
                                        <th className="border px-4 py-2 text-left">Created Date</th>
                                        <th className="border px-4 py-2 text-left">Updated Date</th>
                                        <th className="border px-4 py-2 text-left">Action</th>
                                    </tr>
                                </thead>
                                <Droppable droppableId="slider-table" direction="vertical">
                                    {(provided) => (
                                        <tbody
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {currentSliders.map((slider, idx) => (
                                                <Draggable key={slider.id} draggableId={slider.id} index={idx}>
                                                    {(provided) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                                        >
                                                            <td className="border px-4 py-2 text-gray-600 cursor-move" {...provided.dragHandleProps} title='Move'><FaArrowsAlt /></td>
                                                            <td className="border px-4 py-2">{indexOfFirst + idx + 1}</td>
                                                            <td className="border px-4 py-2">{slider.product}</td>
                                                            <td className="border px-4 py-2">{slider.created}</td>
                                                            <td className="border px-4 py-2">{slider.updated}</td>
                                                            <td className="border px-4 py-2 text-white">
                                                                <div className="flex items-center gap-2">
                                                                    <Link to={`/admin/slider-${slider.id}`} className="bg-blue-500 hover:bg-blue-600 p-1.5 rounded-md" title="Edit">
                                                                        <FaEdit />
                                                                    </Link>
                                                                    <button className="bg-red-500 hover:bg-red-600 p-1.5 rounded-md" title="Delete">
                                                                        <FaTrash />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            </table>
                        </DragDropContext>

                    </div>

                    {/* Pagination Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                        <div>
                            Showing{" "}
                            {filteredSliders.length === 0
                                ? "0 to 0"
                                : `${indexOfFirst + 1} to ${Math.min(indexOfLast, filteredSliders.length)}`}{" "}
                            of {filteredSliders.length} entries

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
    )
}

