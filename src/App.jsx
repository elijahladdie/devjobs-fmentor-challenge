
/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Job from "./pages/Job";
import RoutingError from "./pages/RoutingError";
import LoginForm from "./components/authorization/Login";
import ProtectedRoutes from "./components/authorization/ProtectedRoutes"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RootLayout />}
          // errorElement={<RoutingError />} // If you still need error handling
        >
          <Route path="/auth/login" element={<LoginForm />} /> {/* Login route */}
          <Route element={<ProtectedRoutes />}>

            <Route index element={<Home />} />
            <Route path="job/:jobId" element={<Job />} />

          </Route>
          <Route path="*" element={<RoutingError />} /> {/* Error route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
