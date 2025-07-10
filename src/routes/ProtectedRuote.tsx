import Layout from "@/layouts/Layout";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteLayout() {
  const token = Cookies.get("token");

  if (token) {
    return (
      <main>
        <Layout>
          <Outlet />
        </Layout>
      </main>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRouteLayout;
