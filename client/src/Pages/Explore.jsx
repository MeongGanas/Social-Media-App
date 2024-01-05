import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PostCard from "../components/PostCard";
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
      {!loadPosts && <PostCard posts={posts} />}
    </Layout>
  );
}
