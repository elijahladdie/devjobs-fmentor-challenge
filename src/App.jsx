
/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Job from "./pages/Job";
import RoutingError from "./pages/RoutingError";
import LoginForm from "./components/authorization/Login";
import ProtectedRoutes from "./components/authorization/ProtectedRoutes";
import JobTable from "./pages/Admin/JobTable";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import UserTable from "./pages/Admin/userTable";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RootLayout />}
        >
          <Route index element={<Home />} />
          <Route path="job/:jobId" element={<Job />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="*" element={<RoutingError />} />
        </Route>
        <Route
          path="admin/*"
          element={<AdminLayout />}
        >
          <Route path="*" element={<ProtectedRoutes />}>
            {/* Jobs */}
            <Route index element={<Dashboard />} />
            <Route path="job/manage" element={<JobTable />} />
            <Route path="user/manage" element={<UserTable />} />
            <Route path="*" element={<RoutingError />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
