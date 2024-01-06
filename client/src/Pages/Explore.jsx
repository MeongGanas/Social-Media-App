import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PostCards from "../components/PostCards";
import { useNavigate } from "react-router-dom";
import { useSecureData } from "../hooks/isLogged";
import Loading from "../components/Loading";

export default function Home({ token }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [loadPosts, setLoadPosts] = useState(true);
  const { data, loading, error } = useSecureData(token);

  useEffect(() => {
    const fetchPost = async () => {
      if (error) {
        navigate("/login");
      }
      if (!loading && !error && data) {
        const postResponse = await fetch(`/api/posts`);
        const json = await postResponse.json();

        if (postResponse.ok) {
          setPosts(json);
          setLoadPosts(false);
        }
      }
    };
    fetchPost();
  }, [navigate, token, data, loading, error]);

  return (
    <Layout>
      {loadPosts && <Loading />}
      {!loadPosts && (
        <div className="flex justify-center flex-col">
          <form className="p-4">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search User..."
                required
              />
            </div>
          </form>

          <PostCards posts={posts} />
        </div>
      )}
    </Layout>
  );
}
