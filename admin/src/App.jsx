import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'sonner';
import Orders from './pages/orderManagement/Orders';
import Report from './pages/orderManagement/Report';
import Categories from './pages/productManagement/Categories';
import Subcategories from './pages/productManagement/Subcategories';
import Tax from './pages/productManagement/Tax';
import GlobalExtras from './pages/productManagement/GlobalExtras';
import Products from './pages/productManagement/Products';
import ProductReviews from './pages/productManagement/ProductReviews';
import BulkImportProducts from './pages/productManagement/BulkImportProducts';
import AddCategory from './pages/productManagement/AddCategory';
import AddSubcategories from './pages/productManagement/AddSubcategories';
import AddTax from './pages/productManagement/AddTax';
import AddGlobalExtras from './pages/productManagement/AddGlobalExtras';
import AddProducts from './pages/productManagement/AddProducts';
import Media from './pages/productManagement/Media';
import PosProducts from './pages/posSystem/PosProducts';
import PosOrder from './pages/posSystem/PosOrder';
import Checkout from './pages/posSystem/Checkout';
import Slider from './pages/promotions/Slider';
import AddSlider from './pages/promotions/AddSlider';
import Coupons from './pages/promotions/Coupons';
import AddCoupons from './pages/promotions/AddCoupons';
import FirebaseNotification from './pages/promotions/FirebaseNotification';
import AddFirebaseNotification from './pages/promotions/AddFirebaseNotification';
import TopDeal from './pages/promotions/TopDeal';
import AddBanner from './pages/promotions/AddBanner';
import Banner from './pages/promotions/Banner';
import WorkingHours from './pages/restaurantManagement/WorkingHours';
import CustomStatus from './pages/restaurantManagement/CustomStatus';
import AddCustomStatus from './pages/restaurantManagement/AddCustomStatus';
import StoreReviews from './pages/restaurantManagement/StoreReviews';
import AddStoreReviews from './pages/restaurantManagement/AddStoreReviews';
import Enquiries from './pages/restaurantManagement/Enquiries';
import PaymentMethods from './pages/restaurantManagement/PaymentMethods';
import WhyChooseUs from './pages/restaurantManagement/WhyChooseUs';
import AddWhyChooseUs from './pages/restaurantManagement/AddWhyChooseUs';
import Customers from './pages/userManagement/Customers';
import DeliveryMan from './pages/userManagement/DeliveryMan';
import AddDeliveryMan from './pages/userManagement/AddDeliveryMan';
import AddCustomers from './pages/userManagement/AddCustomers';
import EmployeeRoles from './pages/employeeManagement/EmployeeRoles';
import AddEmployeeRoles from './pages/employeeManagement/AddEmployeeRoles';
import Employee from './pages/employeeManagement/Employee';
import AddEmployee from './pages/employeeManagement/AddEmployee';
import AboutUs from './pages/systemSettings/AboutUs';
import RefundPolicy from './pages/systemSettings/RefundPolicy';
import TermsConditions from './pages/systemSettings/TermsConditions';
import PrivacyPolicy from './pages/systemSettings/PrivacyPolicy';
import Blogs from './pages/systemSettings/Blogs';
import EmailSubscribers from './pages/systemSettings/EmailSubscribers';
import Share from './pages/systemSettings/Share';
import AddBlog from './pages/systemSettings/AddBlog';
import OurTeam from './pages/systemSettings/OurTeam';
import AddOurTeam from './pages/systemSettings/AddOurTeam';
import Tutorial from './pages/systemSettings/Tutorial';
import AddTutorial from './pages/systemSettings/AddTutorial';
import FAQs from './pages/systemSettings/FAQs';
import AddFAQ from './pages/systemSettings/AddFAQ';
import Gallery from './pages/systemSettings/Gallery';
import AddGallery from './pages/systemSettings/AddGallery';
import Whatsappsettings from './pages/systemSettings/Whatsappsettings';
import Language from './pages/systemSettings/Language';
import AddonsManager from './pages/addonsManager/AddonsManager';
import AddAddonsManager from './pages/addonsManager/AddAddonsManager';
import GeneralSettings from './pages/systemSettings/generalSettings/GeneralSettings';
import PrivateRoute from './components/PrivateRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          } />

          {/* Private Routes */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="home" element={<DashboardPage />} />
            <Route path="systemaddons" element={<AddonsManager />} />
            <Route path="createsystem-addons" element={<AddAddonsManager />} />

            {/* POS */}
            <Route path="pos/items" element={<PosProducts />} />
            <Route path="pos/orders" element={<PosOrder />} />
            <Route path="pos/items/checkout" element={<Checkout />} />

            {/* Order Management */}
            <Route path="orders" element={<Orders />} />
            <Route path="report" element={<Report />} />

            {/* Product Management */}
            <Route path="category" element={<Categories />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/:id" element={<AddCategory />} />
            <Route path="sub-category" element={<Subcategories />} />
            <Route path="sub-category/add" element={<AddSubcategories />} />
            <Route path="tax" element={<Tax />} />
            <Route path="tax/add" element={<AddTax />} />
            <Route path="extras" element={<GlobalExtras />} />
            <Route path="extras/add" element={<AddGlobalExtras />} />
            <Route path="item" element={<Products />} />
            <Route path="item/add" element={<AddProducts />} />
            <Route path="product_review" element={<ProductReviews />} />
            <Route path="item/import" element={<BulkImportProducts />} />
            <Route path="media" element={<Media />} />

            {/* Promotions */}
            <Route path="slider" element={<Slider />} />
            <Route path="slider/add" element={<AddSlider />} />
            <Route path="banner/:id" element={<Banner />} />
            <Route path="banner/:id/add" element={<AddBanner />} />
            <Route path="promocode" element={<Coupons />} />
            <Route path="promocode/add" element={<AddCoupons />} />
            <Route path="firebase" element={<FirebaseNotification />} />
            <Route path="firebase/add" element={<AddFirebaseNotification />} />
            <Route path="top_deals" element={<TopDeal />} />

            {/* Restaurant Management */}
            <Route path="time" element={<WorkingHours />} />
            <Route path="custom_status" element={<CustomStatus />} />
            <Route path="custom_status/add" element={<AddCustomStatus />} />
            <Route path="payment" element={<PaymentMethods />} />
            <Route path="reviews" element={<StoreReviews />} />
            <Route path="reviews/add" element={<AddStoreReviews />} />
            <Route path="contact" element={<Enquiries />} />
            <Route path="choose_us" element={<WhyChooseUs />} />
            <Route path="choose_us/add" element={<AddWhyChooseUs />} />

            {/* User Management */}
            <Route path="users" element={<Customers />} />
            <Route path="users/add" element={<AddCustomers />} />
            <Route path="driver" element={<DeliveryMan />} />
            <Route path="driver/add" element={<AddDeliveryMan />} />

            {/* Employee Management */}
            <Route path="roles" element={<EmployeeRoles />} />
            <Route path="roles/add" element={<AddEmployeeRoles />} />
            <Route path="employees" element={<Employee />} />
            <Route path="employees/add" element={<AddEmployee />} />

            {/* System Settings */}
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="refundpolicy" element={<RefundPolicy />} />
            <Route path="termscondition" element={<TermsConditions />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="our-team" element={<OurTeam />} />
            <Route path="our-team/add" element={<AddOurTeam />} />
            <Route path="tutorial" element={<Tutorial />} />
            <Route path="tutorial/add" element={<AddTutorial />} />
            <Route path="faq" element={<FAQs />} />
            <Route path="faq/add" element={<AddFAQ />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/add" element={<AddGallery />} />
            <Route path="subscribers" element={<EmailSubscribers />} />
            <Route path="settings" element={<GeneralSettings />} />
            <Route path="whatsapp_settings" element={<Whatsappsettings />} />
            <Route path="share" element={<Share />} />
            <Route path="language-settings" element={<Language />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster duration={3000} />
    </>
  );
}
