import "./App.css";
import Landing from "./Landing";
import Header from "./Components/Header.js";
import Login from "./Login";
import Vinyl from "./Components/Vinyl.js";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext.js";

export default function App() {
  const { currentUser } = useAuth();

  const Layout = () => {
    return (
      <div>
        <Header />
        <Vinyl id={1} />
      </div>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}
