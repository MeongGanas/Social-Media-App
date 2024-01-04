import { useState, useEffect } from "react";

// Custom hooks
export function useSecureData(token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSecureData = async () => {
      const secureResponse = await fetch("/middleware/secure-data", {
        method: "GET",
        headers: {
          Authorization: token ? token : "",
          "Content-Type": "application/json",
        },
      });

      if (!secureResponse.ok) {
        setError(true);
      }

      const data = await secureResponse.json();
      setData(data);
      setLoading(false);
    };

    fetchSecureData();
  }, [token]);

  return { data, loading, error };
}
