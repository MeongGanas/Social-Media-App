import { useNavigate } from "react-router-dom";
import { useSecureData } from "../hooks/isLogged";
import { useEffect } from "react";

export default function Logout({ logout, token }) {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };

  const { error } = useSecureData(token);
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="min-w-[400px]">
        <h1 className="text-center mb-5 text-xl">Are you sure want Logout?</h1>
        <div className="flex w-full gap-5">
          <button
            className="flex w-full justify-center rounded-md border border-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={back}
          >
            Back
          </button>
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
