import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Navbar,
  Sidebar,
  Dashboard,
  Login,
  SignUp,
  Vehicles,
  Categories,
  CreateVehicle,
  Welcome,
} from "../views";

import LocalStorage from "../managers/LocalStorage";
import { useAuth } from "../hooks/useAuth";

const Routing = () => {
  const { isLoggedIn } = useAuth();
  // if user logged in then not navigate to login and singup page ..
  const Authenticated = ({ children }) => {
    const isAuthenticated = LocalStorage.isLoggedIn();
    const location = useLocation();
    if (isAuthenticated) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  };

  // if user is not logged in then not navigate to login page ..
  const AuthenticatedRoute = ({ children }) => {
    const isAuthenticated = LocalStorage.isLoggedIn();
    const location = useLocation();
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="h-screen flex">
        {isLoggedIn && <Sidebar />}
        <div className="flex flex-col flex-grow">
          <Navbar />
          <div className="p-4 flex-grow overflow-y-auto">
            <Routes>
              {/* Dashboard Page */}
              <Route
                path="/"
                element={
                  <AuthenticatedRoute>
                    <Dashboard />
                  </AuthenticatedRoute>
                }
              />
              {/* Login Page */}
              <Route
                path="/login"
                element={
                  <Authenticated>
                    <Login />
                  </Authenticated>
                }
              />
              {/* Register Page */}
              <Route
                path="/signup"
                element={
                  <Authenticated>
                    <SignUp />
                  </Authenticated>
                }
              />
              {/* Categories Page */}
              <Route
                path="/categories"
                element={
                  <AuthenticatedRoute>
                    <Categories />
                  </AuthenticatedRoute>
                }
              />
              {/* Vehicles Page */}
              <Route
                path="/vehicles"
                element={
                  <AuthenticatedRoute>
                    <Vehicles />
                  </AuthenticatedRoute>
                }
              />
              {/* Create Vehicles Page */}
              <Route
                path="/vehicles/create"
                element={
                  <AuthenticatedRoute>
                    <CreateVehicle />
                  </AuthenticatedRoute>
                }
              />
              {/* Update Vehicle Page */}
              <Route
                path="/vehicles/update/:id"
                element={
                  <AuthenticatedRoute>
                    <CreateVehicle />
                  </AuthenticatedRoute>
                }
              />
              {/* Welcome Page */}
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Routing;
