import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import OrdersPage from "@/pages/admin/OrdersPage";
import DriversPage from "@/pages/admin/DriversPage";
import TripsPage from "@/pages/admin/TripsPage";
import LiveTrackingPage from "@/pages/admin/LiveTrackingPage";
import AnalyticsPage from "@/pages/admin/AnalyticsPage";
import OptimizerPage from "@/pages/admin/OptimizerPage";
import AlertsPage from "@/pages/admin/AlertsPage";
import DriverLogin from "@/pages/driver/LoginPage";
import TripPage from "@/pages/driver/TripPage";
import NavigationPage from "@/pages/driver/NavigationPage";
import { DriverLayout } from "@/components/layout/DriverLayout";

// Placeholder Components
const Login = () => <div className="p-10">Login Page</div>;

import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import HubsPage from "@/pages/HubsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/hubs" element={<HubsPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="optimizer" element={<OptimizerPage />} />
          <Route path="live" element={<LiveTrackingPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
        </Route>

        {/* Driver Routes */}
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver" element={<DriverLayout />}>
          <Route path="trip" element={<TripPage />} />
          <Route path="navigation" element={<NavigationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
