import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/Home";
import SigninPage from "./Pages/Signin";
import SignupPage from "./Pages/Signup";
import LogoutPage from "./Pages/Logout";
import NotFound from "./Pages/NotFound";
import ProfilePage from "./Pages/Profile";
import Explore from "./Pages/Explore";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage token={token} />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route
          exact
          path="/login"
          element={<SigninPage setToken={setToken} token={token} />}
        />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/logout" element={<LogoutPage logout={logout} />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
