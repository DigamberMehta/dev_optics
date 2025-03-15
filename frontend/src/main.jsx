import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SearchResult from "./pages/SearchResult";
import PreviewPage from "./pages/PreviewPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

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
        element: <CartPage />,
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