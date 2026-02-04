"use client";
import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-5 w-5 text-green-600" />,
        info: <Info className="h-5 w-5 text-blue-600" />,
        warning: <TriangleAlert className="h-5 w-5 text-yellow-600" />,
        error: <OctagonX className="h-5 w-5 text-red-600" />,
        loading: <LoaderCircle className="h-5 w-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold",
          title: "font-black uppercase text-sm",
          description: "text-gray-600 font-medium",
          actionButton:
            "bg-[#FF8C00] text-black font-black border-2 border-black hover:bg-black hover:text-white",
          cancelButton:
            "bg-gray-200 text-black font-bold border-2 border-black",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
