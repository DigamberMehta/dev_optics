import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SearchResult from "./pages/SearchResult";
import PreviewPage from "./pages/PreviewPage";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CategoryResults from "./components/result/CategoryResults";
import PriceResults from "./components/result/PriceResults";
import FrameResult from "./components/result/FrameResult"; // Import FrameResult
import EyewearforEveryoneResult from "./components/result/EyewearforEveryoneResult";
import HomePreview from "./components/preview/HomePreview";
 
import Cart from "./components/Cart/Cart";
import UserProfile from "./pages/UserProfile";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import OrderStatusPage from "./pages/OrderStatusPage"; // Import OrderStatusPage
import SearchResults from "./components/result/SearchResults";
import WishlistPage from "./pages/WishlistPage";
import AdminOrders from "./components/admin/AdminOrders"; // Import AdminOrders
import AdminAddProduct from "./components/admin/AdminAddProduct";
import AdminProductList from "./components/admin/AdminProductList"; // Import AdminProductList
import AdminPanel from "./components/admin/AdminPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/searchResults",
        element: <SearchResult />,
      },
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/preview",
        element: <PreviewPage />,
      },
      {
        path: "/cartpage",
        element: <Cart />,
      },
      {
        path: "/category/:category/:subcategory",
        element: <CategoryResults />,
      },
      {
        path: "/price/:priceRange",
        element: <PriceResults />,
      },
      {
        path: "/frame-shape/:shapeName", // Add this route
        element: <FrameResult />,
      },
      {
        path: "/EyewearforEveryone/:categoryName", // Add this new route
        element: <EyewearforEveryoneResult />,
      },
      {
        path: "/product/:id/:slug", // Corrected route for HomePreview
        element: <HomePreview />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-status/:orderId",
        element: <OrderStatusPage />, // Changed to OrderStatusPage
      },
      {
        path: "/order-confirmation/:orderId", // Keep this route for the final confirmation
        element: <OrderConfirmationPage />,
      },
      {
        path: "/orders",
        element: <UserOrdersPage />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/add/product",
        element: <AdminAddProduct />,
      },
      {
        path: "/admin/products",
        element: <AdminProductList />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
    <Footer />
  </>
);
