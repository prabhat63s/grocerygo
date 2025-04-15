import React, { useEffect, useState } from "react";
import axios from "axios";
import CommonLayout from '../../components/layout/CommonLayout';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [variantData, setVariantData] = useState(null);

  const changeQty = (type) => {
    setQuantity((prev) =>
      type === "plus" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const setVariantPrice = async (variants) => {
    try {
      const { data } = await axios.post(
        "https://grocerygo.infotechgravity.com/admin/pos/addtocart",
        {
          name: variants,
          item_id: product.item_id,
        }
      );
      if (data.status === 1) {
        setVariantData(data);
      }
    } catch (error) {
      console.error("Error fetching variant price:", error);
    }
  };

  useEffect(() => {
    setVariantPrice([]);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex justify-between items-start p-4 border-b">
          <div className="flex gap-2 items-start">
            <img
              src={product.item_type_image}
              alt="type"
              className="w-4 h-4 mt-2"
            />
            <div>
              <h2 className="text-lg font-bold mb-1 w-[90%]">{product.item_name}</h2>
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900">
                  ₹{variantData?.price || product.item_price}
                </p>
                <del className="text-gray-400 text-sm">
                  ₹{variantData?.original_price || product.original_price}
                </del>
                <span className="bg-neutral-200 text-blcak text-xs font-semibold px-2 py-0.5 rounded">
                  {(variantData?.off || product.off)?.toFixed(1)}% OFF
                </span>
              </div>
            </div>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-gray-100 p-3 rounded">
            <span className="text-sm text-gray-600">
              <strong>SKU:</strong> {product.sku}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex items-center border rounded px-2 py-1">
              <button onClick={() => changeQty("minus")}>-</button>
              <input
                readOnly
                className="w-10 text-center border-0 bg-transparent"
                value={quantity}
              />
              <button onClick={() => changeQty("plus")}>+</button>
            </div>
            <button
              onClick={() => {
                setTimeout(() => {
                  onClose()
                }, 300);
              }}
              className="flex-1 bg-black text-white py-1 px-4 rounded hover:bg-neutral-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PosProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showItem = (slug, url) => {
    console.log(`Show item details for: ${slug} via ${url}`);
    setSelectedProduct({
      item_id: 1,
      item_name: slug,
      item_price: 5.99,
      original_price: 150.00,
      off: 26.7,
      sku: "SKU12345",
      item_type_image: "/img/veg.svg",
    });
  };

  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 p-5">
        <h1 className="text-2xl font-semibold">POS Products</h1>
      </div>

      <div className="px-5">
        {/* Search bar */}
        <div className="flex  mb-5">
          <form className="flex w-full gap-2">
            <input
              type="text"
              name="search"
              placeholder="Type and enter"
              className="rounded-md w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-700"
            >
              Fetch
            </button>
          </form>
        </div>

        {/* Item Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {[
            {
              name: "Nescafe Classic Instant Coffee - Pack of 60 Sachet",
              img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-66728f6a5bd4b.jpg",
              category: "Beverage",
              slug: "nescafe-classic-instant-coffee-pack-of-60-sachet",
            },
            {
              name: "Chheda's Salt-n-Pepper Banana Chips - 170 g",
              img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-66728e7c308b1.jpg",
              category: "Snacks",
              slug: "chhedas-salt-n-pepper-banana-chips-170-g",
            },
            {
              name: "Lay's India's Magic Masala Potato Chips (40 g)",
              img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-66728df63cbed.jpg",
              category: "Snacks",
              slug: "lays-indias-magic-masala-potato-chips-40-g",
            },
            {
              name: "Uncle Chipps Spicy Treat Flavour Potato Chips",
              img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-66728d022f1e0.jpg",
              category: "Snacks",
              slug: "uncle-chipps-spicy-treat-flavour-potato-chips",
            },
            {
              name: "Kurkure Masala Munch Crisps",
              img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-66728a1d04e20.jpg",
              category: "Snacks",
              slug: "kurkure-masala-munch-crisps",
            },
            {
              name: "Meatzza Fresh Chicken Wings (Frozen)",
              img: "https://grocerygo.infotechgravity.com/storage/app/public/admin-assets/images/item/item-667287ed5fa88.jpeg",
              category: "Meat",
              slug: "meatzza-fresh-chicken-wings-frozen",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white border rounded-lg p-3 flex gap-2 items-start">
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{item.category}</p>
                <h2 className="text-sm flex gap-1 font-medium text-gray-900 line-clamp-2"><img
                  src='/img/veg.svg'
                  alt="type"
                  className="w-4 h-4 mt-1"
                />{item.name}</h2>
                <div className="mt-3">
                  <button
                    className="border border-green-500 text-green-500 px-4 py-1 rounded bg-green-50 text-sm"
                    onClick={() => showItem(item.slug, 'https://grocerygo.infotechgravity.com/admin/pos/show-item')}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Pagination */}
        <div className="flex justify-center my-8">
          <nav className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded text-gray-500 cursor-not-allowed">
              ‹
            </button>
            <button className="px-4 py-2 bg-black text-white rounded">1</button>
            <a className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">2</a>
            <a className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">›</a>
          </nav>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </CommonLayout>
  );
}
