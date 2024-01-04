import { useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import { useSecureData } from "../hooks/isLogged";
import { useEffect, useState } from "react";

export default function Profile({ token }) {
  const { data, loading, error } = useSecureData(token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (error) {
        navigate("/login");
      }
      if (data && !loading && !error) {
        const userResponse = await fetch(`users/getUser/${data.id}`);

        if (userResponse.ok) {
          const json = await userResponse.json();
          console.log(json);
          setUser(json);
          return;
        }
      }
    };
    fetchUser();
  }, [navigate, data]);

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">User Profile</h1>
        {user && <h1>{user.username}</h1>}
      </div>
    </Layout>
  );
}
