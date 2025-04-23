import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import CommonLayout from '../../components/layout/CommonLayout';
import { toast } from 'sonner';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
};

const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'color', 'background', 'script',
    'blockquote', 'code-block', 'align', 'link', 'image', 'video',
];

// Helper to map pathname to type and title
const getPageInfo = (pathname) => {
    switch (pathname) {
        case '/admin/pages/about': return { type: 'about', title: 'About Us' };
        case '/admin/pages/privacypolicy': return { type: 'privacypolicy', title: 'Privacy Policy' };
        case '/admin/pages/refundpolicy': return { type: 'refundpolicy', title: 'Refund Policy' };
        case '/admin/pages/termsAndConditions': return { type: 'termsAndConditions', title: 'Terms & Conditions' };
        default: return { type: '', title: '' };
    }
};

export default function AboutUs() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const { type, title: pageTitle } = getPageInfo(location.pathname);

    // Fetch content on mount
    useEffect(() => {
        const fetchContent = async () => {
            if (!type) return;
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/content/${type}`);
                if (res.status === 200 && res.data) {
                    setContent(res.data.content);
                    toast.success('Content fetched successfully');
                } else {
                    setError(res.data.message || 'Failed to load content');
                }
            } catch (err) {
                setError('Something went wrong');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!type) return;
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/content/save`, {
                type,
                content,
            });

            if (res.status === 200) {
                toast.success('Content saved successfully');
            } else {
                setError(res.data.message || 'Failed to save content');
            }
        } catch (err) {
            setError('Something went wrong');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="text-2xl font-semibold">{pageTitle}</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-md space-y-6">
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4">
                        <Link
                            to="/admin/home"
                            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-black text-white px-5 py-2 rounded-md hover:bg-neutral-700"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </CommonLayout>
    );
}
