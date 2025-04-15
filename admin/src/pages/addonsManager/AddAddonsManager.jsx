import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CommonLayout from '../../components/layout/CommonLayout'

export default function AddAddonsManager() {
    const [addonZip, setAddonZip] = useState(null)
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAddonZip(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (addonZip) {
            const formData = new FormData()
            formData.append('addon_zip', addonZip)
            // Replace with the actual API endpoint
            fetch('https://grocerygo.infotechgravity.com/admin/systemaddons/store', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle success
                    console.log(data)
                })
                .catch((error) => {
                    // Handle error
                    console.error(error)
                })
        } else {
            alert('Please select a file to upload.')
        }
    }

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">
                        <Link to="/admin/custom_status" >Custom Status</Link> / Add New
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-4 rounded-md shadow bg-gray-50 space-y-4">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="addon_zip" className="">Zip File</label>
                            <input
                                type="file"
                                className="w-full mt-2 border border-gray-300 rounded-lg py-1 px-1 text-gray-700"
                                name="addon_zip"
                                id="addon_zip"
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/systemaddons')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black hover:bg-neutral-700 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    )
}
