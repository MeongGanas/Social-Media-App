import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/Home";
import SigninPage from "./Pages/Signin";
import SignupPage from "./Pages/Signup";
import LogoutPage from "./Pages/Logout";
import NotFound from "./Pages/NotFound";
import ProfilePage from "./Pages/Profile";
import Explore from "./Pages/Explore";
import { useState } from "react";
import CreatePost from "./Pages/CreatePost";

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
        <Route exact path="/explore" element={<Explore token={token} />} />
        <Route exact path="/profile" element={<ProfilePage token={token} />} />
        <Route
          exact
          path="/login"
          element={<SigninPage setToken={setToken} token={token} />}
        />
        <Route exact path="/signup" element={<SignupPage token={token} />} />
        <Route
          exact
          path="/logout"
          element={<LogoutPage logout={logout} token={token} />}
        />
        <Route
          exact
          path="/profile/create"
          element={<CreatePost />}
          token={token}
        />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
