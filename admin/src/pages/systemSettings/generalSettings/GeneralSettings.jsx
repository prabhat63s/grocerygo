import { useState } from 'react';
import CommonLayout from '../../../components/layout/CommonLayout';
import ContactSettingsForm from './ContactSettingsForm';
import SeoSettingsForm from './SeoSettingsForm';
import NotificationSettingsForm from './NotificationSettingsForm';
import ThemeSettingsForm from './ThemeSettingsForm';
import BusinessSettingsForm from './BusinessSettingsForm';
import AppSettings from './AppSettings';
import EmailSMTPConfig from './EmailSMTPConfig';
import GoogleLoginConfig from './GoogleLoginConfig';
import EmailTemplate from './EmailTemplate';
import FacebookLoginConfig from './FacebookLoginConfig';
import TrustedBadgesSettings from './TrustedBadgesSettings';
import SafeSecureSettings from './SafeSecureSettings';
import ProductReviewSettings from './ProductReviewSettings';
import RecaptchaSettings from './RecaptchaSettings';
import SocialLinks from './SocialLinks';
import CartCheckoutCountdown from './CartCheckoutCountdown';
import CartCheckoutProgressBar from './CartCheckoutProgressBar';
import PixelSettings from './PixelSettings';
import PwaSettings from './PwaSettings';
import TawkSettings from './TawkSettings';
import WizzChatSettings from '../WizzChatSettings';
import AgeVerification from './AgeVerification';
import QuickCall from './QuickCall';
import ProductFakeView from './ProductFakeView';
import FakeSalesNotification from './FakeSalesNotification';
import WebsiteSettings from './WebsiteSettings';

const settingsList = [
  { id: 'contact', name: 'Contact Settings', addon: true },
  { id: 'seo', name: 'SEO Settings', addon: false },
  { id: 'notification', name: 'Notification Settings (Admin)', addon: true },
  { id: 'theme', name: 'Theme Setting', addon: true },
  { id: 'business', name: 'Business Settings', addon: false },
  { id: 'website', name: 'Website Settings', addon: false },
  { id: 'mobile', name: 'Mobile App Settings', addon: false },
  { id: 'smtp', name: 'Email SMTP Configuration', addon: true },
  { id: 'email-templates', name: 'Email Templates', addon: true },
  { id: 'google-login', name: 'Google Login Configuration', addon: true },
  { id: 'facebook-login', name: 'Facebook Login Configuration', addon: true },
  { id: 'badges', name: 'Trusted Badges Settings', addon: true },
  { id: 'secure', name: 'Safe & Secure Settings', addon: true },
  { id: 'product_review', name: 'Review Settings', addon: true },
  { id: 'recaptcha', name: 'Google reCAPTCHA', addon: true },
  { id: 'social', name: 'Social Links', addon: false },
  { id: 'cart_checkout_countdown', name: 'Cart/Checkout countdown', addon: true },
  { id: 'cart_checkout_progressbar', name: 'Cart/Checkout progressbar', addon: true },
  { id: 'pixel', name: 'Pixel Settings', addon: true },
  { id: 'pwa', name: 'PWA', addon: true },
  { id: 'tawk_settings', name: 'Tawk to Settings', addon: true },
  { id: 'wizz_chat_settings', name: 'Wizz Chat settings', addon: true },
  { id: 'age_verification', name: 'Age Verification', addon: true },
  { id: 'quick_call', name: 'Quick Call', addon: true },
  { id: 'fake_sales_notification', name: 'Fake Sales Notification', addon: true },
  { id: 'product_fake_view', name: 'Product Fake View', addon: true },
];

export default function GeneralSettings() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleItemClick = (index, id) => {
    setActiveIndex(index);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <CommonLayout>
      <div className="flex flex-col gap-5 px-5 pt-5">
        <h1 className="text-2xl font-semibold">General Settings</h1>
        <div className="flex flex-col md:flex-row gap-4 h-[65vh]">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 rounded-md shadow h-full overflow-auto">
            {settingsList.map((setting, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index, setting.id)}
                className={`w-full text-sm text-left p-3 flex justify-between items-center text-black transition ${activeIndex === index ? 'bg-yellow-500' : ''
                  }`}
              >
                {setting.name}
                {setting.addon && (
                  <div className="flex items-center gap-1">
                    <span className="bg-red-600 text-xs px-2 py-[2px] text-white rounded-md">Addon</span>
                    <i className="fa-solid fa-angle-right" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="w-full md:w-3/4 rounded-md h-full overflow-auto space-y-5">
            <ContactSettingsForm />
            <SeoSettingsForm />
            <NotificationSettingsForm />
            <ThemeSettingsForm />
            <BusinessSettingsForm />
            <WebsiteSettings />
            <AppSettings />
            <EmailSMTPConfig />
            <EmailTemplate />
            <GoogleLoginConfig />
            <FacebookLoginConfig />
            <TrustedBadgesSettings />
            <SafeSecureSettings />
            <ProductReviewSettings />
            <RecaptchaSettings />
            <SocialLinks />
            <CartCheckoutCountdown />
            <CartCheckoutProgressBar />
            <PixelSettings />
            <PwaSettings />
            <TawkSettings />
            <WizzChatSettings />
            <AgeVerification />
            <QuickCall />
            <FakeSalesNotification />
            <ProductFakeView />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
