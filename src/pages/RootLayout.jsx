import Header from "../components/Header/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGlobalContext } from "../context";

const RootLayout = () => {
  const { theme } = useGlobalContext();

  // Load initial color theme
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default RootLayout;
