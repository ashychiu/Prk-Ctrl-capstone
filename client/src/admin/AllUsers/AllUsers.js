import React from "react";

const AllUsers = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/users`);
      setUserList(data);
    })();
  }, []);

  return <div></div>;
};

export default AllUsers;
