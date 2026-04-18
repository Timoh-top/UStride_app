// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/NavBar";

// Pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import CreatePost from "./pages/Post";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import BuyerDashboard from "./pages/dashboard/buyer/BuyerDashboard";
import VendorDashboard from "./pages/dashboard/vendor/VendorDashboard";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";


// Category Pages
import CategoryFood from "./pages/CategoryFood";
import CategoryAcademics from "./pages/CategoryAcademics";
import CategoryGadgets from "./pages/CategoryGadgets";
import CategoryFashion from "./pages/CategoryFashion";
import CategorySkills from "./pages/CategorySkills";

function App() {
  return (
    <>
      {/* Navbar stays on all pages */}
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
        </Route>
        <Route path="/dashboard" element={<DashboardRouter />} />

        

        <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
        <Route path="/dashboard/vendor" element={<VendorDashboard />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />

        {/* Categories Overview Page (5 big cards) */}
        <Route path="/categories" element={<Categories />} />

        {/* Individual Category Pages */}
        <Route path="/category/food" element={<CategoryFood />} />
        <Route path="/category/academics" element={<CategoryAcademics />} />
        <Route path="/category/gadgets" element={<CategoryGadgets />} />
        <Route path="/category/fashion" element={<CategoryFashion />} />
        <Route path="/category/skills" element={<CategorySkills />} />
      </Routes>
    </>
  );
}

export default App;