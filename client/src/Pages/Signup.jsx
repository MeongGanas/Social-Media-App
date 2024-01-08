import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useSecureData } from "../hooks/isLogged";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Signup({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const { data, loading, error } = useSecureData(token);
  useEffect(() => {
    if (data && !loading && !error) {
      navigate("/");
    }
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (confirm !== password) {
      setErr("Password confirmation salah!");
      return false;
    }

    const userData = { username, password };
    const response = await fetch("/users/create", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setErr(json.error);
      return false;
    }

    setIsLoading(false);

    swal
      .fire({
        title: "Success!",
        text: "Account has been create succesfuly!",
        icon: "success",
        confirmButtonText: "Close",
        timer: 1000,
      })
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center p-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {err && <h1 className="text-red-700 text-xl">{err}</h1>}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm-pass"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirmation password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm-pass"
                name="confirm-pass"
                type="password"
                autoComplete="disable"
                required
                onChange={(e) => setConfirm(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex w-full justify-center rounded-md bg-indigo-600 py-0.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
            <LoadingButton
              type="submit"
              loading={isLoading}
              onClick={handleSignup}
              sx={{ color: "white", textTransform: "none" }}
            >
              Sign up
            </LoadingButton>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have account?
          <Link
            to="/login"
            className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
