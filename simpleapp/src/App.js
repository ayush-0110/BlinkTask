import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthenticatePage from "./pages/authenticate";
import MainPage from "./pages/mainPage";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        await axios.get(`${process.env.REACT_APP_API}/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token validation failed", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="main">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <div className="App">
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/login" element={<AuthenticatePage />} />
            <Route
              path="/upload"
              element={
                isAuthenticated ? (
                  <MainPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/upload" : "/login"} replace />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
