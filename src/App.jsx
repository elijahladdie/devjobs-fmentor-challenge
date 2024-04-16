import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Job from "./pages/Job";
import RoutingError from "./pages/RoutingError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RoutingError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "job/:jobId",
        element: <Job />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
