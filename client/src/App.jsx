import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/Home";
import SigninPage from "./Pages/Signin";
import SignupPage from "./Pages/Signup";
import NotFound from "./Pages/NotFound";
import ProfilePage from "./Pages/Profile";
import Explore from "./Pages/Explore";
import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const signin = async (e) => {
    e.preventDefault();
    const logindata = { username, password };

    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify(logindata),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setErr(json.error);
    } else {
      setToken(json.token);
      navigate("/");
    }
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
          element={
            <SigninPage
              login={signin}
              setPassword={setPassword}
              setUsername={setUsername}
              error={err}
              token={token}
            />
          }
        />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
