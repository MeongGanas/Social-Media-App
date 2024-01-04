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
      <div className="p-5">
        <h1 className="text-xl">Halaman Home</h1>
      </div>
    </Layout>
  );
}
