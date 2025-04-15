import React, { useState } from 'react'
import CommonLayout from '../../components/layout/CommonLayout'

export default function PaymentMethods() {
  const [isStripeAvailable, setIsStripeAvailable] = useState(false)
  const [environment, setEnvironment] = useState('sandbox')
  const [publicKey, setPublicKey] = useState('pk_test_...')
  const [secretKey, setSecretKey] = useState('*********')
  const [currency, setCurrency] = useState('USD')
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)

  const handleSave = () => {
    console.log({ name, publicKey, secretKey, currency, environment, isStripeAvailable, image })
  }

  const [previewUrl, setPreviewUrl] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  return (
    <CommonLayout>
      <div className="p-5 space-y-6">
        <h1 className="text-2xl font-semibold">Payment Methods</h1>

        <div className="bg-white p-6 space-y-4 rounded-md shadow">
          {/* stripe */}
          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-yellow-500 border-b px-4 py-2 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/img/payment-65893b4da12e0.png"
                  alt="Stripe"
                  className="w-8 h-8 rounded"
                />
                <b>Stripe</b>
                <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
              </div>
              <div className="cursor-move">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Payment Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={name || "Stripe"}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Environment</label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'sandbox'}
                      onChange={() => setEnvironment('sandbox')}
                    />
                    <span>Sandbox</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'production'}
                      onChange={() => setEnvironment('production')}
                    />
                    <span>Production</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Public Key</label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={publicKey}
                  onChange={e => setPublicKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Secret Key <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={secretKey}
                  onChange={e => setSecretKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Currency Symbol <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                />
              </div>
              {/* Image Upload */}
              <div className='flex flex-col'>
                <label className="form-label">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded mt-2 object-cover border"
                  />
                )}
              </div>
            </div>

            <div className="p-4 mt-6 flex justify-between items-center">
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={isStripeAvailable} onChange={() => setIsStripeAvailable(!isStripeAvailable)} />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isStripeAvailable ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                  <span className={`${isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                  <span className={`${!isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isStripeAvailable ? 'translate-x-7' : ''}`} />
                </span>
              </label>

              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-700">
                Save
              </button>
            </div>
          </div>
          {/* cod */}
          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-yellow-500 border-b px-4 py-2 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/img/payment-65893b4da08fa.png"
                  alt="Stripe"
                  className="w-8 h-8 rounded"
                />
                <b>COD</b>
                <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
              </div>
              <div className="cursor-move">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Payment Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={name || "COD"}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className='flex flex-col'>
                <label className="form-label">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded mt-2 object-cover border"
                  />
                )}
              </div>
            </div>

            <div className="p-4 mt-6 flex justify-between items-center">

              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={isStripeAvailable} onChange={() => setIsStripeAvailable(!isStripeAvailable)} />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isStripeAvailable ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                  <span className={`${isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                  <span className={`${!isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isStripeAvailable ? 'translate-x-7' : ''}`} />
                </span>
              </label>

              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-700">
                Save
              </button>
            </div>
          </div>
          {/* Paypal */}
          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-yellow-500 border-b px-4 py-2 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/img/payment-6673cd38139d5.png"
                  alt="Paypal"
                  className="w-8 h-8 rounded"
                />
                <b>Paypal</b>
                <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
              </div>
              <div className="cursor-move">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Payment Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={name || "Paypal"}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Environment</label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'sandbox'}
                      onChange={() => setEnvironment('sandbox')}
                    />
                    <span>Sandbox</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'production'}
                      onChange={() => setEnvironment('production')}
                    />
                    <span>Production</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Public Key</label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={publicKey}
                  onChange={e => setPublicKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Secret Key <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={secretKey}
                  onChange={e => setSecretKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Currency Symbol <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                />
              </div>
              {/* Image Upload */}
              <div className='flex flex-col'>
                <label className="form-label">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded mt-2 object-cover border"
                  />
                )}
              </div>
            </div>

            <div className="p-4 mt-6 flex justify-between items-center">
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={isStripeAvailable} onChange={() => setIsStripeAvailable(!isStripeAvailable)} />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isStripeAvailable ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                  <span className={`${isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                  <span className={`${!isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isStripeAvailable ? 'translate-x-7' : ''}`} />
                </span>
              </label>

              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-700">
                Save
              </button>
            </div>
          </div>
          {/*  RazorPay  */}
          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-yellow-500 border-b px-4 py-2 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/img/payment-65893b4da0e7e.png"
                  alt=" RazorPay "
                  className="w-8 h-8 rounded"
                />
                <b> RazorPay </b>
                <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
              </div>
              <div className="cursor-move">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Payment Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={name || " RazorPay "}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Environment</label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'sandbox'}
                      onChange={() => setEnvironment('sandbox')}
                    />
                    <span>Sandbox</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'production'}
                      onChange={() => setEnvironment('production')}
                    />
                    <span>Production</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Public Key</label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={publicKey}
                  onChange={e => setPublicKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Secret Key <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={secretKey}
                  onChange={e => setSecretKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Currency Symbol <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                />
              </div>
              {/* Image Upload */}
              <div className='flex flex-col'>
                <label className="form-label">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded mt-2 object-cover border"
                  />
                )}
              </div>
            </div>

            <div className="p-4 mt-6 flex justify-between items-center">
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={isStripeAvailable} onChange={() => setIsStripeAvailable(!isStripeAvailable)} />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isStripeAvailable ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                  <span className={`${isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                  <span className={`${!isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isStripeAvailable ? 'translate-x-7' : ''}`} />
                </span>
              </label>

              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-700">
                Save
              </button>
            </div>
          </div>
          {/*  phonepe   */}
          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-yellow-500 border-b px-4 py-2 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/img/payment-6673cd59717e7.png"
                  alt="  phonepe  "
                  className="w-8 h-8 rounded"
                />
                <b>  phonepe  </b>
                <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
              </div>
              <div className="cursor-move">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Payment Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={name || "  phonepe  "}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Environment</label>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'sandbox'}
                      onChange={() => setEnvironment('sandbox')}
                    />
                    <span>Sandbox</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      checked={environment === 'production'}
                      onChange={() => setEnvironment('production')}
                    />
                    <span>Production</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="form-label">Public Key</label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={publicKey}
                  onChange={e => setPublicKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Secret Key <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={secretKey}
                  onChange={e => setSecretKey(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Currency Symbol <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                />
              </div>
              {/* Image Upload */}
              <div className='flex flex-col'>
                <label className="form-label">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded mt-2 object-cover border"
                  />
                )}
              </div>
            </div>

            <div className="p-4 mt-6 flex justify-between items-center">
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={isStripeAvailable} onChange={() => setIsStripeAvailable(!isStripeAvailable)} />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isStripeAvailable ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                  <span className={`${isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                  <span className={`${!isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isStripeAvailable ? 'translate-x-7' : ''}`} />
                </span>
              </label>

              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-700">
                Save
              </button>
            </div>
          </div>
          {/*   Bank Transfer    */}
          <div className="rounded-md border">
            <div className="flex items-center justify-between bg-yellow-500 border-b px-4 py-2 rounded-md mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/img/payment-666c1060c136c.png"
                  alt="   Bank Transfer   "
                  className="w-8 h-8 rounded"
                />
                <b>   Bank Transfer   </b>
                <span className="bg-[#dc3545] text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
              </div>
              <div className="cursor-move">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Payment Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="border px-2 py-1 mt-2 rounded-md w-full"
                  value={name || "   Bank Transfer   "}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className='flex flex-col'>
                <label className="form-label">Image <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full mt-2 border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-10 h-10 rounded mt-2 object-cover border"
                  />
                )}
              </div>
            </div>

            <div className='p-4'>
              <label className="form-label">Payment Description <span className="text-red-500">*</span></label>
              <textarea
                type="text"
                className="border px-2 py-1 mt-2 rounded-md w-full"
                value={name || " Payment Description  "}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="p-4 mt-6 flex justify-between items-center">
              <label className="relative inline-block w-14 h-7">
                <input type="checkbox" className="opacity-0 w-0 h-0" checked={isStripeAvailable} onChange={() => setIsStripeAvailable(!isStripeAvailable)} />
                <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-300 rounded-full flex items-center justify-between px-2 text-xs font-semibold ${isStripeAvailable ? 'bg-green-600 text-white' : 'bg-black text-white'}`} >
                  <span className={`${isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>OFF</span>
                  <span className={`${!isStripeAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute h-5 w-5 bg-white rounded-full bottom-1 left-1 transition-transform duration-300 ${isStripeAvailable ? 'translate-x-7' : ''}`} />
                </span>
              </label>

              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-neutral-700">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}
