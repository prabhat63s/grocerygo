import React, { useState } from 'react';
import CommonLayout from '../../components/layout/CommonLayout';

const days = [
    { name: 'Monday', defaultTimes: ["12:00 AM", "01:00 PM", "01:00 PM", "11:59 PM", 2] },
    { name: 'Tuesday', defaultTimes: ["12:00 AM", "01:00 PM", "01:00 PM", "11:59 PM", 2] },
    { name: 'Wednesday', defaultTimes: ["12:00 AM", "01:00 PM", "01:00 PM", "10:00 PM", 2] },
    { name: 'Thursday', defaultTimes: ["09:00 AM", "01:00 PM", "01:30 PM", "07:00 PM", 2] },
    { name: 'Friday', defaultTimes: ["12:00 AM", "11:30 AM", "01:30 PM", "11:59 PM", 2] },
    { name: 'Saturday', defaultTimes: ["12:00 AM", "01:00 PM", "01:00 PM", "11:59 PM", 2] },
    { name: 'Sunday', defaultTimes: ["closed", "closed", "closed", "closed", 1], readOnly: true }
];


export default function WorkingHours() {
    const [isChecked, setIsChecked] = useState(true);

    return (
        <CommonLayout>
            <div className="flex flex-col gap-5 p-5">
                <div className="flex justify-between md:flex-row flex-col gap-3 md:items-center">
                    <h1 className="text-2xl font-semibold">Working Hours</h1>
                </div>

                <div className="p-4 bg-gray-50 rounded-md shadow">
                    <form>
                        <div className="grid md:grid-cols-3 gap-4 border-b pb-4">
                            <div>
                                <label className="font-medium">Slot Time Interval<span className="text-red-500">*</span></label>
                                <div className="flex gap-2 mt-1">
                                    <input type="text" name="interval_time" defaultValue="45" required className="w-full border px-3 py-2 rounded" />
                                    <select name="interval_type" defaultValue="1" className="border px-2 py-2 rounded">
                                        <option value="1">Minutes</option>
                                        <option value="2">Hour</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="font-medium">Per Slot Order Limit<span className="text-red-500">*</span></label>
                                <input type="number" name="slot_limit" defaultValue="2" required className="w-full border px-3 py-2 rounded mt-1" />
                            </div>

                            <div className="flex items-center gap-3 mt-5">
                                <label className="font-medium">Date & Time</label>
                                {/* switch btn */}
                                <label className="relative inline-block w-14 h-7">
                                    <input type="checkbox" className="opacity-0 w-0 h-0" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isChecked ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                                        <span className={`${isChecked ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                                        <span className={`${!isChecked ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                                        <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isChecked ? 'translate-x-7' : ''}`} />
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="hidden md:grid grid-cols-6 text-center font-semibold my-4">
                            <div></div>
                            <div>Opening Time</div>
                            <div>Break Start</div>
                            <div>Break End</div>
                            <div>Closing Time</div>
                            <div>Full Day Close</div>
                        </div>

                        {days.map((day) => (
                            <div key={day.name} className="grid md:grid-cols-6 gap-3 items-end mb-4">
                                <div className="font-semibold">{day.name}</div>
                                {["open_time", "break_start", "break_end", "close_time"].map((field, i) => (
                                    <div key={field}>
                                        <label className="md:hidden block text-sm">{field.replace('_', ' ')}</label>
                                        <input
                                            type="text"
                                            name={`${field}[]`}
                                            defaultValue={day.defaultTimes[i]}
                                            required
                                            readOnly={day.readOnly}
                                            className="w-full border px-3 py-2 rounded"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="md:hidden block text-sm">Full Day Close</label>
                                    <select name="always_close[]" defaultValue={day.defaultTimes[4]} required className="w-full border px-3 py-2 rounded">
                                        <option value="">Select</option>
                                        <option value="1">Yes</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                        ))}

                        <div className="text-right mt-5">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </CommonLayout>
    );
}
