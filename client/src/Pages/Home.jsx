import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export default function Home({ token }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts/65925b9e4c5678d0aba26210");
      const json = await response.json();

      if (response.ok) {
        setPosts(json);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts && posts.map((post) => <PostCard key={post._id} />)}
      </div>
    </Layout>
  );
}
