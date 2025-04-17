import React, { useState } from 'react'
import { FaAddressBook, FaBell, FaBlog, FaBusinessTime, FaCashRegister, FaChartLine, FaEnvelope, FaEnvira, FaImage, FaImages, FaLanguage, FaListUl, FaMoneyCheck, FaMotorcycle, FaShare, FaShopify, FaShoppingBag, FaStar, FaTag, FaTags, FaTv, FaUsers, FaUserSecret, FaWhatsapp } from 'react-icons/fa'
import { FaCartShopping, FaCircleQuestion, FaListCheck, FaUser } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import { IoCaretDown, IoCaretUp, IoExtensionPuzzleSharp, IoHomeSharp, IoRefreshCircleSharp } from 'react-icons/io5'
import { LuBadgePercent, LuListTree, LuMessagesSquare } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ setOpenSidebar }) {
    const location = useLocation().pathname;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [pageOpen, setPageOpen] = useState(false);
    const [bannerOpen, setBannerOpen] = useState(false);


    const handleClearCache = () => {
        // Clear Local Storage
        localStorage.clear();

        // Clear Session Storage
        sessionStorage.clear();

        // Unregister all Service Workers
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
        }

        // Clear Caches (for PWAs or offline apps)
        if ('caches' in window) {
            caches.keys().then(function (names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
        }

        // Reload the page
        window.location.reload();
    };

    return (
        <div className='w-full'>
            <div className="flex justify-between md:justify-center items-center pb-2 border-b">
                <h1 className="text-center text-2xl font-medium ">Admin</h1>
                <button onClick={() => setOpenSidebar(false)} className="flex md:hidden text-white">
                    <MdClose size={22} />
                </button>
            </div>

            <div className="pt-4 w-full flex flex-col gap-2">
                <Link to='/admin/home' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/home' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><IoHomeSharp /> Dashboard</div>
                </Link>

                <Link to='/admin/systemaddons' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/systemaddons' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><IoExtensionPuzzleSharp /> Addons Manager</div>
                    <span className="text-transparent bg-clip-text bg-200 animate-rainbow font-black text-xs" style={{ backgroundImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', }}> Premium </span>
                </Link>
            </div>

            {/* POS SYSTEM */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">POS SYSTEM </h1>
                <Link onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaShoppingBag /> POS <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span></div>
                    {isDropdownOpen ? <IoCaretUp /> : <IoCaretDown />}
                </Link>

                {isDropdownOpen && (
                    <div
                        className="pl-4 flex flex-col gap-2 transform transition-all duration-300 ease-out animate-slideDown"
                    >
                        <Link to='/admin/pos/items' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/pos/items' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill /> Products</div>
                        </Link>
                        <Link to='/admin/pos/orders' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/pos/orders' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill /> Orders</div>
                        </Link>
                    </div>
                )}

            </div>

            {/* Order Management */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">Order Management</h1>
                <Link to="/admin/orders" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/orders' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaCartShopping />Orders </div>
                </Link>
                <Link to='/admin/report' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/report' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaChartLine /> Report</div>
                </Link>
            </div>

            {/* Product Management */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">Product Management</h1>
                <Link to="/admin/category" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/category' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaListUl />Categories </div>
                </Link>
                <Link to='/admin/sub-category' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/sub-category' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><LuListTree /> Subcategories</div>
                </Link>
                <Link to="/admin/tax" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/tax' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaCashRegister />Tax </div>
                </Link>
                <Link to='/admin/extras' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/extras' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><GoDotFill /> Global Extras</div>
                </Link>
                <Link to="/admin/item" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/item' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaListCheck />Products </div>
                </Link>
                <Link to='/admin/product_review' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/product_review' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaStar /> Product Reviews </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to="/admin/item/import" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/item/import' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaListCheck />Bulk import products </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
            </div>

            {/* Promotions */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">Promotions</h1>
                <Link to="/admin/slider" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/slider' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaImages />Sliders </div>
                </Link>
                <Link onClick={() => setBannerOpen(!bannerOpen)} className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 w-full`}>
                    <div className="flex gap-2 items-center"><FaImage /> Banners</div>
                    {bannerOpen ? <IoCaretUp /> : <IoCaretDown />}
                </Link>
                {bannerOpen && (
                    <div
                        className="pl-4 flex flex-col gap-2 transform transition-all duration-300 ease-out animate-slideDown"
                    >
                        <Link to='/admin/banner/bannersection-1' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/banner/bannersection-1' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill />Banner Section 1</div>
                        </Link>
                        <Link to='/admin/banner/bannersection-2' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/banner/bannersection-2' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill />Banner Section 2</div>
                        </Link>
                        <Link to='/admin/banner/bannersection-3' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/banner/bannersection-3' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill />Banner Section 3</div>
                        </Link>
                        <Link to='/admin/banner/bannersection-4' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/banner/bannersection-4' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill />Banner Section 4</div>
                        </Link>
                    </div>
                )}
                <Link to="/admin/promocode" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/promocode' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaTag />Coupons </div>
                </Link>
                <Link to='/admin/firebase' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/firebase' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaBell />  Firebase Notification </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to="/admin/top_deals" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/top_deals' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><LuBadgePercent />Top Deal </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>

            </div>

            {/* Restaurant Management */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">Restaurant Management</h1>
                <Link to="/admin/time" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/time' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaBusinessTime />Working Hours </div>
                </Link>
                <Link to='/admin/custom_status' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/custom_status' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaTags /> Custom Status </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to="/admin/payment" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/payment' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaMoneyCheck />Payment Methods </div>
                </Link>
                <Link to='/admin/reviews' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/reviews' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaStar /> Store Reviews </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to="/admin/contact" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/contact' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaAddressBook />Enquiries </div>
                </Link>
                <Link to='/admin/choose_us' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/choose_us' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><LuMessagesSquare /> Why Choose Us</div>
                </Link>
            </div>

            {/* User Management */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">User Management</h1>
                <Link to="/admin/users" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/users' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaUsers />Customers</div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to='/admin/driver' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/driver' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaMotorcycle /> Delivery Man</div>
                </Link>
            </div>

            {/* Employee Management */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">Employee Management</h1>
                <Link to="/admin/roles" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/roles' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaUserSecret />Employee Roles</div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to='/admin/employees' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/employees' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaUsers /> Employee</div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
            </div>

            {/* System settings */}
            <div className="py-4 w-full flex flex-col gap-2">
                <h1 className="text-xs md:text-sm font-medium text-gray-500">System settings</h1>
                <Link onClick={() => setPageOpen(!pageOpen)} className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/orders' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><LuListTree />Pages </div>
                    {pageOpen ? <IoCaretUp /> : <IoCaretDown />}
                </Link>

                {pageOpen && (
                    <div
                        className="pl-4 flex flex-col gap-2 transform transition-all duration-300 ease-out animate-slideDown"
                    >
                        <Link to='/admin/aboutus' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/aboutus' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill /> About Us</div>
                        </Link>
                        <Link to='/admin/privacypolicy' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/privacypolicy' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill /> Privacy Policy</div>
                        </Link>
                        <Link to='/admin/refundpolicy' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/refundpolicy' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill /> Refund Policy</div>
                        </Link>
                        <Link to='/admin/termscondition' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/termscondition' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                            <div className="flex gap-2 items-center"><GoDotFill /> Terms & Conditions</div>
                        </Link>
                    </div>
                )}
                <Link to="/admin/blogs" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/blogs' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaBlog />Blogs </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to="/admin/our-team" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/our-team' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaUser />Our Team </div>
                </Link>
                <Link to="/admin/tutorial" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/tutorial' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaTv />Tutorial </div>
                </Link>
                <Link to="/admin/faq" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/faq' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaCircleQuestion />FAQs </div>
                </Link>
                <Link to="/admin/gallery" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/gallery' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaEnvira />Gallery </div>
                </Link>
                <Link to="/admin/subscribers" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/subscribers' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaCartShopping />Email Subscribers </div>
                </Link>
                <Link to="/admin/settings" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/settings' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaEnvelope />General Settings </div>
                </Link>
                <Link to="/admin/whatsapp_settings" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/whatsapp_settings' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaWhatsapp />Whatsapp settings </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link to='/admin/share' className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/share' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaShare /> Share</div>
                </Link>
                <Link to="/admin/language-settings" className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/language-settings' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><FaLanguage />Language </div>
                    <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                </Link>
                <Link onClick={handleClearCache} className={`flex justify-between items-center rounded-md text-xs md:text-sm px-2 py-1.5 ${location === '/admin/report' ? "bg-white text-black" : "bg-black text-gray-300 hover:bg-white hover:text-black"}  w-full`}>
                    <div className="flex gap-2 items-center"><IoRefreshCircleSharp /> Clear Cache</div>
                </Link>
            </div>
        </div >
    )
}
