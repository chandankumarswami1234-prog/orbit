import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await API.get("/auth/profile");
      setUser(response.data);
    } catch (error) {
      console.error(error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h2>Orbit</h2>

        {user && (
          <span
            style={{
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Welcome, {user.name}
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to="/profile">
          <button>
            My Profile
          </button>
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;