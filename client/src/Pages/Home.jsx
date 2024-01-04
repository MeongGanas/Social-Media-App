import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export default function Home({ token }) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const secureResponse = await fetch("/middleware/secure-data", {
        method: "GET",
        headers: {
          Authorization: token ? token : "",
          "Content-Type": "application/json",
        },
      });
      if (!secureResponse.ok) {
        navigate("/login");
      }
      const data = await secureResponse.json();

      const postResponse = await fetch(`/api/posts/${data.id}`);
      const json = await postResponse.json();

      if (postResponse.ok) {
        setPosts(json);
      }
    };
    fetchPost();
  }, [navigate, token]);

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts && posts.map((post) => <PostCard key={post._id} />)}
      </div>
    </Layout>
  );
}
