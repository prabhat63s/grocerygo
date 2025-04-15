import React, { useState } from 'react';
import { FaShareAlt, FaDownload, FaFacebook, FaTwitter, FaLinkedin, FaTelegram, FaWhatsapp, FaReddit } from 'react-icons/fa';
import CommonLayout from '../../components/layout/CommonLayout';

export default function SharePage() {
    const [showShareIcons, setShowShareIcons] = useState(false);
    const shareUrl = "https://grocerygo.infotechgravity.com";

    const toggleShare = () => {
        setShowShareIcons(!showShareIcons);
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="text-2xl font-semibold">Share</h1>
                </div>

                <div className="bg-white shadow rounded-md p-6 text-center">
                    <img
                        src={`https://qrcode.tec-it.com/API/QRCode?data=${encodeURIComponent(shareUrl)}&choe=UTF-8`}
                        alt="QR Code"
                        width="300"
                        className="mx-auto"
                    />

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={toggleShare}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded flex items-center gap-2"
                        >
                            Share <FaShareAlt />
                        </button>
                        <a
                            href={`https://qrcode.tec-it.com/API/QRCode?data=${encodeURIComponent(shareUrl)}&choe=UTF-8`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded flex items-center gap-2"
                        >
                            Download <FaDownload />
                        </a>
                    </div>

                    {showShareIcons && (
                        <div className="mt-6 flex justify-center flex-wrap gap-4 text-2xl text-gray-700">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer">
                                <FaFacebook className="hover:text-blue-600" />
                            </a>
                            <a href={`https://twitter.com/intent/tweet?text=Check+this+out&url=${shareUrl}`} target="_blank" rel="noreferrer">
                                <FaTwitter className="hover:text-sky-500" />
                            </a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">
                                <FaLinkedin className="hover:text-blue-700" />
                            </a>
                            <a href={`https://telegram.me/share/url?url=${shareUrl}&text=Check+this+out`} target="_blank" rel="noreferrer">
                                <FaTelegram className="hover:text-blue-400" />
                            </a>
                            <a href={`https://wa.me/?text=${shareUrl}`} target="_blank" rel="noreferrer">
                                <FaWhatsapp className="hover:text-green-500" />
                            </a>
                            <a href={`https://www.reddit.com/submit?url=${shareUrl}&title=Check+this+out`} target="_blank" rel="noreferrer">
                                <FaReddit className="hover:text-orange-500" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </CommonLayout>
    );
}
