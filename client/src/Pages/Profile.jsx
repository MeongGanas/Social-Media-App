import { useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import { useSecureData } from "../hooks/isLogged";
import { useEffect } from "react";

export default function Profile({ token }) {
  const { data, loading, error } = useSecureData(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  });
  return (
    <Layout>
      <h1>Profile Page</h1>
    </Layout>
  );
}
