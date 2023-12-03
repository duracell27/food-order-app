import { useEffect, useState } from "react";

export default function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile", { method: "GET" }).then((response) =>
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      })
    );
  }, []);

  return { data, loading };
}
