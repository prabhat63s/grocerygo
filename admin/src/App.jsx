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
            <Route path="pos">
              <Route path='items' element={<PosProducts />} />
              <Route path="orders" element={<PosOrder />} />
              <Route path="items/checkout" element={<Checkout />} />
            </Route>

            {/* Order Management */}
            <Route path="orders" element={<Orders />} />
            <Route path="report" element={<Report />} />

            {/* Product Management */}
            <Route path="category">
              <Route index element={<Categories />} />
              <Route path="add" element={<AddCategory />} />
              <Route path=":id" element={<AddCategory />} />
            </Route>
            <Route path="sub-category">
              <Route index element={<Subcategories />} />
              <Route path="add" element={<AddSubcategories />} />
              <Route path=":id" element={<AddSubcategories />} />
            </Route>
            <Route path="tax">
              <Route index element={<Tax />} />
              <Route path="add" element={<AddTax />} />
              <Route path=":id" element={<AddTax />} />
            </Route>
            <Route path="extras">
              <Route index element={<GlobalExtras />} />
              <Route path="add" element={<AddGlobalExtras />} />
              <Route path=":id" element={<AddGlobalExtras />} />
            </Route>
            <Route path="item">
              <Route index element={<Products />} />
              <Route path="add" element={<AddProducts />} />
              <Route path=":id" element={<AddProducts />} />
              <Route path="import" element={<BulkImportProducts />} />
            </Route>
            <Route path="product_review" element={<ProductReviews />} />
            <Route path="media" element={<Media />} />

            {/* Promotions */}
            <Route path="slider">
              <Route index element={<Slider />} />
              <Route path="add" element={<AddSlider />} />
              <Route path=":id" element={<AddSlider />} />
            </Route>
            <Route path=":type" element={<Banner />} />  {/* displaying banners */}
            <Route path=":type/add" element={<AddBanner />} />  {/* adding new banners */}
            <Route path=":type/:bannerId" element={<AddBanner />} />  {/* editing existing banners */}
            <Route path="promocode">
              <Route index element={<Coupons />} />
              <Route path="add" element={<AddCoupons />} />
              <Route path=":id" element={<AddCoupons />} />
            </Route>
            <Route path="firebase">
              <Route index element={<FirebaseNotification />} />
              <Route path="add" element={<AddFirebaseNotification />} />
            </Route>
            <Route path="top_deals" element={<TopDeal />} />

            {/* Restaurant Management */}
            <Route path="time" element={<WorkingHours />} />
            <Route path="custom_status">
              <Route index element={<CustomStatus />} />
              <Route path="add" element={<AddCustomStatus />} />
              <Route path=":id" element={<AddCustomStatus />} />
            </Route>
            <Route path="payment" element={<PaymentMethods />} />
            <Route path="reviews">
              <Route index element={<StoreReviews />} />
              <Route path="add" element={<AddStoreReviews />} />
              <Route path=":id" element={<AddStoreReviews />} />
            </Route>
            <Route path="contact" element={<Enquiries />} />
            <Route path="choose_us">
              <Route index element={<WhyChooseUs />} />
              <Route path="add" element={<AddWhyChooseUs />} />
              <Route path=":id" element={<AddWhyChooseUs />} />
            </Route>

            {/* User Management */}
            <Route path="users">
              <Route index element={<Customers />} />
              <Route path="add" element={<AddCustomers />} />
              <Route path=":id" element={<AddCustomers />} />
            </Route>
            <Route path="driver">
              <Route index element={<DeliveryMan />} />
              <Route path="add" element={<AddDeliveryMan />} />
              <Route path=":id" element={<AddDeliveryMan />} />
            </Route>

            {/* Employee Management */}
            <Route path="roles">
              <Route index element={<EmployeeRoles />} />
              <Route path="add" element={<AddEmployeeRoles />} />
              <Route path=":id" element={<AddEmployeeRoles />} />
            </Route>
            <Route path="employees">
              <Route index element={<Employee />} />
              <Route path="add" element={<AddEmployee />} />
              <Route path=":id" element={<AddEmployee />} />
            </Route>

            {/* System Settings */}
            <Route path=":id" element={<AboutUs />} />
            <Route path="blogs">
              <Route index element={<Blogs />} />
              <Route path="add" element={<AddBlog />} />
              <Route path=":id" element={<AddBlog />} />
            </Route>
            <Route path="our-team">
              <Route index element={<OurTeam />} />
              <Route path="add" element={<AddOurTeam />} />
              <Route path=":id" element={<AddOurTeam />} />
            </Route>
            <Route path="tutorial">
              <Route index element={<Tutorial />} />
              <Route path="add" element={<AddTutorial />} />
              <Route path=":id" element={<AddTutorial />} />
            </Route>
            <Route path="faq">
              <Route index element={<FAQs />} />
              <Route path="add" element={<AddFAQ />} />
              <Route path=":id" element={<AddFAQ />} />
            </Route>
            <Route path="gallery">
              <Route index element={<Gallery />} />
              <Route path="add" element={<AddGallery />} />
              <Route path=":id" element={<AddGallery />} />
            </Route>
            <Route path="subscribers" element={<EmailSubscribers />} />
            <Route path="settings" element={<GeneralSettings />} />
            <Route path="whatsapp_settings" element={<Whatsappsettings />} />
            <Route path="share" element={<Share />} />
            <Route path="language-settings" element={<Language />} />
          </Route>
        </Routes>
      </BrowserRouter >

      <Toaster duration={3000} />
    </>
  );
}
