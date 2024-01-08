import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import SingleCard from "../components/SingleCard";
import { useNavigate } from "react-router-dom";
import { useSecureData } from "../hooks/isLogged";
import Loading from "../components/Loading";
import { LikeProvider } from "../context/likeContext";

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
  }, [navigate, error, loading, data]);

  return (
    <Layout>
      {loadPosts && (
        <div className="flex justify-center items-center w-full min-h-screen">
          <Loading />
        </div>
      )}
      {!loadPosts && (
        <div className="p-5">
          <div className="flex justify-center mt-5">
            <div>
              {posts &&
                posts.map((post) => (
                  <LikeProvider key={post._id}>
                    <SingleCard post={post} userId={data.id} />
                  </LikeProvider>
                ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
