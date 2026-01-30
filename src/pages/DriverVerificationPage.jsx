import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeoLayout from "../components/neo/NeoLayout";
import NeoCard from "../components/neo/NeoCard";
import NeoButton from "../components/neo/NeoButton";
import { User, CreditCard, FileText, CheckCircle, Upload } from "lucide-react";

const DriverVerificationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    aadharId: "",
    aadharNumber: "",
    bankAccountNumber: "",
    ifscCode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    console.log("Verification Data:", formData);
    setSubmitted(true);
    setTimeout(() => {
      navigate("/driver-dashboard");
    }, 2000);
  };

  if (submitted) {
    return (
      <NeoLayout>
        <div className="h-screen flex items-center justify-center bg-[#F4F4F5]">
          <NeoCard className="text-center p-12 max-w-md mx-auto animate-in zoom-in duration-300">
            <CheckCircle className="w-24 h-24 text-[#22C55E] mx-auto mb-6" />
            <h2 className="text-3xl font-black uppercase mb-4">
              Verification Submitted!
            </h2>
            <p className="font-bold text-gray-500 mb-8">
              Your documents are being processed. You will be redirected to your
              dashboard shortly.
            </p>
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          </NeoCard>
        </div>
      </NeoLayout>
    );
  }

  return (
    <NeoLayout>
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-2 text-center">
          Pilot Verification
        </h1>
        <p className="text-center font-bold text-gray-500 mb-12 uppercase">
          Complete your profile to start accepting orders
        </p>

        <NeoCard className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase flex items-center gap-2 border-b-2 border-dashed border-gray-300 pb-2">
                <User className="w-6 h-6" /> Personal Identity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    Full Name (As per Aadhar)
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#FF8C00]/20 transition-all placeholder:font-normal placeholder:text-gray-400"
                    placeholder="e.g. RAJESH KUMAR"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    Aadhar ID (File Name/Ref)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="aadharId"
                      value={formData.aadharId}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#FF8C00]/20 transition-all border-r-0"
                      placeholder="AADHAR_FRONT.JPG"
                    />
                    <button
                      type="button"
                      className="bg-gray-100 border-2 border-black px-4 hover:bg-gray-200"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-black uppercase">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    required
                    maxLength={12}
                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#FF8C00]/20 transition-all tracking-widest"
                    placeholder="XXXX XXXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-black uppercase flex items-center gap-2 border-b-2 border-dashed border-gray-300 pb-2">
                <CreditCard className="w-6 h-6" /> Banking Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#FF8C00]/20 transition-all"
                    placeholder="ACCOUNT NO."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-[#FF8C00]/20 transition-all uppercase"
                    placeholder="BKID000..."
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start gap-3 bg-yellow-50 p-4 border-2 border-[#FF8C00] mt-4">
              <div className="mt-1">
                <FileText className="w-5 h-5 text-[#FF8C00]" />
              </div>
              <p className="text-xs font-bold text-gray-600 leading-relaxed">
                By submitting this form, you consent to the verification of your
                identity and banking details. False information may lead to
                permanent suspension from the GTL Pilot Network.
              </p>
            </div>

            <div className="pt-4">
              <NeoButton
                type="submit"
                className="w-full py-4 text-lg justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                Submit for Verification
              </NeoButton>
            </div>
          </form>
        </NeoCard>
      </div>
    </NeoLayout>
  );
};

export default DriverVerificationPage;
