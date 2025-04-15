import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CommonLayout from '../../components/layout/CommonLayout';

const modules = {
    toolbar: [
      // Header options: h1, h2, h3, h4, h5, h6, and normal text (false)
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // Font options (if needed)
      [{ font: [] }],
      // Size options (optional)
      [{ size: ['small', false, 'large', 'huge'] }],
      // Text formatting options
      ['bold', 'italic', 'underline', 'strike'],
      // List options
      [{ list: 'ordered' }, { list: 'bullet' }],
      // Indentation tools
      [{ indent: '-1' }, { indent: '+1' }],
      // Color options for text and background
      [{ color: [] }, { background: [] }],
      // Script (subscript/superscript)
      [{ script: 'sub' }, { script: 'super' }],
      // Other options like blockquote and code block
      ['blockquote', 'code-block'],
      // Alignment options
      [{ align: [] }],
      // Link and image insertion
      ['link', 'image', 'video'],
      // Clean formatting button
      ['clean'],
    ],
  };

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'color', 'background', 'script',
    'blockquote', 'code-block', 'align', 'link', 'image', 'video',
  ];

export default function TermsConditions() {
    const [content, setContent] = useState('<p><em><strong>Lorem is About content</strong></em></p>');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/admin/aboutus/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ about_content: content }),
            });

            const data = await res.json();
            console.log('Response data:', data);

            if (res.ok) {
                setContent('<p><em><strong>Lorem is About content</strong></em></p>');
                navigate('/home');
            } else {
                setError(data.message || 'Failed to save content');
            }

        } catch (err) {
            console.error(err);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommonLayout>
            <div className="p-5 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="text-2xl font-semibold">
                        <Link to="#">Terms & Conditions</Link>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-md space-y-6">
                    <div>
                        <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4">
                        <Link
                            to="/home"
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

