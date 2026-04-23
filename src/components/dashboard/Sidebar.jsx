import React from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  TrendingUp,
  Settings,
} from "lucide-react";

const VendorSidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Overview",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard/vendor",
    },
    {
      label: "My Products",
      icon: <Package size={18} />,
      path: "/dashboard/vendor/products",
    },
    {
      label: "Create Product",
      icon: <PlusCircle size={18} />,
      path: "/product/create",
      highlight: true,
    },
    {
      label: "Sales",
      icon: <TrendingUp size={18} />,
      path: "/dashboard/vendor/sales",
    },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      path: "/profile",
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col py-5 shadow-sm">
      
      {/* BRAND */}
      <div className="px-4 mb-5">
        <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Vendor Studio
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your products & sales
        </p>
      </div>

      <div className="border-t border-gray-100" />

      {/* NAV ITEMS */}
      <div className="flex flex-col gap-1 mt-3 px-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
              hover:bg-gray-100
              ${item.highlight
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-gray-700"}
            `}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-auto border-t border-gray-100 px-2 pt-3">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 w-full"
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
    </div>
  );
};

export default VendorSidebar;