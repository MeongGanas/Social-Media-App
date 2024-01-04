import { useEffect } from "react";
import Layout from "../Layout/layout";
import { useSecureData } from "../hooks/isLogged";
import { useNavigate } from "react-router-dom";

export default function Explore({ token }) {
  const { data, loading, error } = useSecureData(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  });
  return (
    <Layout>
      <h1>Explore Page</h1>
    </Layout>
  );
}
