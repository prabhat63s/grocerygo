import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react'
import { FaGlobe, FaKey, FaRegUser, FaUser } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoCaretDown, IoCaretUp } from 'react-icons/io5'
import { MdMenu } from 'react-icons/md'
import Sidebar from '../Sidebar'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import EditProfileModal from '../modals/EditProfileModal'
import ChangePasswordModal from '../modals/ChangePasswordModal'
import LogoutModal from '../modals/LogoutModal'
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const [isChecked, setIsChecked] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)

    const [selectedLanguage, setSelectedLanguage] = useState("English")
    const [isLanguageOpen, setIsLanguageOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);


    const langRef = useRef(null)
    const navigate = useNavigate();
    const profileRef = useRef(null)
    const { user, logout } = useAuth();

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLanguageOpen(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate('/');
            toast.success('Logout successful!');
        }, 300);
    };


    return (
        <>
            {/* models */}
            <EditProfileModal isEditProfileOpen={isEditProfileOpen} setIsEditProfileOpen={setIsEditProfileOpen} />
            <ChangePasswordModal isOpen={isChangePasswordOpen} setIsOpen={setIsChangePasswordOpen} />
            <LogoutModal isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} onConfirm={handleLogout} />

            {/* header */}
            <header className='flex justify-between items-center px-4 py-3 shadow-sm bg-white'>
                {/* Mobile menu toggle */}
                <div className="md:hidden flex items-center">
                    <button className='pr-3' onClick={() => setOpenSidebar(true)}>
                        <MdMenu size={24} />
                    </button>
                </div>
                {openSidebar && (
                    <div className="fixed inset-0 z-50 flex">
                        {/* Sidebar content */}
                        <div className={` fixed top-0 left-0 h-full w-[65%] bg-black text-white shadow-lg p-4 z-50  transform transition-transform duration-300 overflow-y-auto ${openSidebar ? 'translate-x-0' : '-translate-x-full'} `} >
                            <Sidebar setOpenSidebar={setOpenSidebar} />
                        </div>
                    </div>
                )}

                {/* Right-side controls */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* switch btn */}
                    <label className="relative inline-block w-14 h-7">
                        <input type="checkbox" className="opacity-0 w-0 h-0" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isChecked ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                            <span className={`${isChecked ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                            <span className={`${!isChecked ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                            <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isChecked ? 'translate-x-7' : ''}`} />
                        </span>
                    </label>

                    {/* Language Selector */}
                    <div className="relative" ref={langRef}>
                        <div onClick={() => setIsLanguageOpen(prev => !prev)} className="flex items-center border border-neutral-600 text-gray-700 px-3 py-2 md:py-1 rounded-md cursor-pointer gap-2" >
                            <FaGlobe className='flex md:hidden' />
                            <img src={selectedLanguage === "English" ? "/img/eng.png" : "/img/ind.png"} alt="flag" className='hidden md:flex w-6 h-6 object-cover rounded-full' />
                            <p className='hidden md:flex'>{selectedLanguage}</p>
                            {isLanguageOpen ? <IoCaretUp /> : <IoCaretDown />}
                        </div>

                        {isLanguageOpen && (
                            <div className='absolute -right-3 mt-2 bg-white border rounded shadow-lg w-36 z-10'>
                                <ul className='text-gray-700'>
                                    {["English", "Hindi"].map((lang) => (
                                        <li key={lang} onClick={() => { setSelectedLanguage(lang), setIsLanguageOpen(false) }} className='px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer flex items-center gap-2' >
                                            <img src={lang === "English" ? "/img/eng.png" : "/img/ind.png"} alt="flag" className='w-6 h-6 object-cover rounded-full' />
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button onClick={() => setIsDropdownOpen(prev => !prev)} className='flex items-center text-gray-600' >
                            <img src={user?.profileImage || "/img/user.png"} alt="user" className='w-8 h-8 object-cover rounded-full' />
                            <span className='pl-2 pr-1'>Admin</span>
                            {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>

                        {isDropdownOpen && (
                            <div className='absolute right-0 mt-2 bg-white border rounded shadow-lg w-44 z-10'>
                                <ul className='text-sm text-gray-700'>
                                    <li onClick={() => setIsEditProfileOpen(true)} className='px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer flex items-center gap-2'><FaRegUser /> Edit profile</li>
                                    <li onClick={() => setIsChangePasswordOpen(true)} className='px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer flex items-center gap-2'><FaKey /> Change Password</li>
                                    <li onClick={() => setIsLogoutOpen(true)} className='px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer flex items-center gap-2'><FaArrowRightFromBracket /> Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}
