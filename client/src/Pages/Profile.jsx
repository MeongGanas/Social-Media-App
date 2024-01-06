import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import { useSecureData } from "../hooks/isLogged";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import Loading from "../components/Loading";
import PostCards from "../components/PostCards";

export default function Profile({ token }) {
  const { data, loading, error } = useSecureData(token);
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const navigate = useNavigate();
  const [loadUser, setLoadUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (error) {
        navigate("/login");
      }
      if (data && !loading && !error) {
        const userResponse = await fetch(`users/getUser/${data.id}`);
        const userPostResponse = await fetch(`api/posts/${data.id}`);

        if (userResponse.ok) {
          const userJson = await userResponse.json();
          const postJson = await userPostResponse.json();
          console.log(postJson);
          setUser(userJson);
          setUserPosts(postJson);
          setLoadUser(false);
          return;
        }
      }
    };
    fetchUser();
  }, [navigate, data, error, loading]);

  return (
    <Layout>
      {loadUser && <Loading />}
      {!loadUser && (
        <div className="p-5">
          <div className="profile_wrapper border-b border-b-gray pb-5 mb-5">
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
          <PostCards posts={userPosts} />
        </div>
      )}
    </Layout>
  );
}
