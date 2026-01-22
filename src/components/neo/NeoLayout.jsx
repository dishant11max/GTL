import React from "react";
import { useNavigate } from "react-router-dom";
import NeoButton from "./NeoButton";

const NeoLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black selection:bg-[#FF9933] selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b-4 border-black bg-white px-6 py-4 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-[#FF9933] border-2 border-black flex items-center justify-center text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            🇮🇳
          </div>
          <span className="text-2xl font-bold tracking-tighter uppercase hidden md:block">
            Dispatchly
          </span>
        </div>

        <div className="hidden md:flex gap-6 font-bold uppercase tracking-tight items-center">
          <button
            onClick={() => navigate("/")}
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF9933]"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/services")}
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF9933]"
          >
            Services
          </button>
          <button
            onClick={() => navigate("/hubs")}
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF9933]"
          >
            Hubs
          </button>
        </div>

        <div className="flex gap-4">
          <div className="hidden md:flex gap-4 mr-4 border-r-2 border-black pr-4 items-center">
            <button
              onClick={() => navigate("/admin/orders")}
              className="font-bold hover:underline decoration-2 underline-offset-4 text-sm flex items-center"
            >
              ADMIN BOARD
            </button>
            <button
              onClick={() => navigate("/driver/trip")}
              className="font-bold hover:underline decoration-2 underline-offset-4 text-sm flex items-center"
            >
              DRIVER APP
            </button>
          </div>
          <NeoButton
            variant="secondary"
            onClick={() => navigate("/driver/login")}
            className="hidden md:flex py-2 px-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Driver Login
          </NeoButton>
          <NeoButton
            variant="dark"
            onClick={() => navigate("/admin/login")}
            className="py-2 px-4 shadow-[3px_3px_0px_0px_rgba(128,128,128,1)]"
          >
            Admin
          </NeoButton>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[#FF9933] border-t-4 border-black py-12 px-6 text-center mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
            <div>
              <h3 className="font-black text-2xl mb-4 uppercase">Dispatchly</h3>
              <p className="font-medium">India's modern logistics network.</p>
            </div>
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">Links</h3>
              <ul className="space-y-2 font-bold">
                <li>
                  <a href="/driver/login" className="hover:underline">
                    Join as Driver
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Partner with us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">Contact</h3>
              <p className="font-medium">support@dispatchly.in</p>
              <p className="font-medium">+91 80 1234 5678</p>
            </div>
          </div>
          <div className="font-mono text-sm opacity-80 pt-8 border-t-2 border-black/20">
            © 2026 DISPATCHLY INDIA.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeoLayout;
