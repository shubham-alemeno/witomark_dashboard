import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import MyWitomarks from "@/pages/MyWitomarks";
import MyProducts from "@/pages/MyProducts";
import MyPrinters from "@/pages/MyPrinters";
import ProtectedRoute from "@/ProtectedRoute";
import Layout from "@/components/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "my-witomarks", element: <MyWitomarks /> },
      { path: "my-products", element: <MyProducts /> },
      { path: "my-printers", element: <MyPrinters /> }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
