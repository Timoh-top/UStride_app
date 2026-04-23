import React from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BuyerDashboard from "./pages/dashboard/buyer/BuyerDashboard";
import VendorDashboard from "./pages/dashboard/vendor/VendorDashboard";

import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";

function App() {
  return (
    <Routes>

      {/* Public layout */}
      <Route
        path="/home"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
      </Route>

      <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
      <Route path="/dashboard/vendor" element={<VendorDashboard />} />

      <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />

    </Routes>
  );
}

export default App;