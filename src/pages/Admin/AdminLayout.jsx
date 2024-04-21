
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGlobalContext } from "../../context";
import AdminNav from "../../components/AdminNav/AdminNav";

import "./admin.css"

const AdminLayout = () => {
  const { theme } = useGlobalContext();

  // Load initial color theme
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <section className="flex">
      <AdminNav />
      <Outlet />
    </section>
  );
};

export default AdminLayout;
