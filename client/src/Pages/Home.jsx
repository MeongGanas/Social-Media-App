import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useSecureData } from "../hooks/isLogged";

export default function Home({ token }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const { data, loading, error } = useSecureData(token);

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [navigate, error]);

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <h1>Halaman Home</h1>
      </div>
    </Layout>
  );
}
