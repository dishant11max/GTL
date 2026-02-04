import React from "react";
import { useNavigate } from "react-router-dom";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoButton from "@/components/neo/NeoButton";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NeoLayout>
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* 404 Badge */}
        <div className="inline-block mb-8 px-6 py-3 bg-[#FF8C00] border-4 border-black font-black text-6xl md:text-8xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
          404
        </div>

        {/* Message */}
        <h1 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter">
          Page Not Found
        </h1>
        <p className="text-xl font-medium text-gray-600 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <NeoButton onClick={() => navigate(-1)} variant="secondary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </NeoButton>
          <NeoButton onClick={() => navigate("/")}>
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </NeoButton>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 text-9xl font-black opacity-5 uppercase tracking-widest select-none">
          LOST?
        </div>
      </div>
    </NeoLayout>
  );
};

export default NotFoundPage;
