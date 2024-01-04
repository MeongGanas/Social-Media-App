import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import { useSecureData } from "../hooks/isLogged";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import Loading from "../components/Loading";

export default function Profile({ token }) {
  const { data, loading, error } = useSecureData(token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loadUser, setLoadUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (error) {
        navigate("/login");
      }
      if (data && !loading && !error) {
        const userResponse = await fetch(`users/getUser/${data.id}`);

        if (userResponse.ok) {
          const json = await userResponse.json();
          console.log(json);
          setUser(json);
          setLoadUser(false);
          return;
        }
      }
    };
    fetchUser();
  }, [navigate, data]);

  return (
    <Layout>
      {loadUser && <Loading />}
      {!loadUser && (
        <div className="p-5">
          <div className="profile_wrapper">
            <h1 className="text-xl">User Profile</h1>
            <div className="mt-2 mb-5 flex items-center gap-2">
              <img src="/icon/user.jpg" width="80" alt="user_image" />
              <div className="flex gap-5 items-center">
                {user && <h1 className="text-lg">{user.username}</h1>}
                <button
                  type="button"
                  className="text-slate-100 bg-gray-500 transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <Link
              to="/profile/create"
              className="bg-slate-100 p-3 rounded-full w-fit flex items-center justify-center border border-slate-500 hover:bg-slate-200 transition duration-200"
            >
              <Add className="text-slate-500" />
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
