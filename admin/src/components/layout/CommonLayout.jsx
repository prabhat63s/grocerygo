import React from 'react'
import Sidebar from '../Sidebar'
import Header from './Header'

export default function CommonLayout({ children }) {
    return (
        <div className='flex justify-between w-full h-screen'>
            <div className="md:w-[20%] hidden md:flex bg-black px-3 pt-5 text-white overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <Sidebar />
            </div>

            <main className="w-full md:w-[80%] flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow overflow-auto bg-gray-100">
                    {children}
                </div>
                <footer className="border-t p-3 text-center">
                    <p>Copyright @GroceryGo All Rights Reserved</p>
                </footer>
            </main>

        </div>
    )
}
