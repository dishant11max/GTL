import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import HubsPage from "@/pages/HubsPage";
import AboutPage from "@/pages/AboutPage";
import DriverLoginPage from "@/pages/DriverLoginPage";
import DriverDashboardPage from "@/pages/DriverDashboardPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import ContactPage from "@/pages/ContactPage";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/hubs" element={<HubsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/driver-login" element={<DriverLoginPage />} />
        <Route path="/driver-dashboard" element={<DriverDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
