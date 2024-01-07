import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import SingleCard from "../components/SingleCard";
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
  }, [navigate, error, loading, data]);

  return (
    <Layout>
      {loadPosts && <Loading />}
      {!loading && (
        <div className="p-5">
          <h1 className="text-2xl font-semibold">Home</h1>
          <div className="flex justify-center">
            <div>
              {posts &&
                posts.map((post) => (
                  <SingleCard post={post} key={post._id} userId={data.id} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
