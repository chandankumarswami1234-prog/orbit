import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);
const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    toast.warning("Please enter Email and Password");
    return;
  }

  try {
    setLoading(true);

    const response = await API.post("/auth/login", {
      email,
      password,
    });

    console.log(response.data);
    console.log(response.data.token);

    if (response.data.token) {

      // Save token
      localStorage.setItem("token", response.data.token);

      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }

      console.log(
        "Stored Token:",
        localStorage.getItem("token")
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } else {

      toast.error(
        response.data.message || "Invalid Email or Password"
      );

    }

  } catch (error) {

    console.error(error);

    if (error.response) {
      toast.error(
        error.response.data.message || "Login Failed"
      );
    } else {
      toast.error("Server not responding");
    }

  } finally {
    setLoading(false);
  }
};
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "60px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Orbit Login
      </h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <div
        style={{
          marginTop: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() =>
            setShowPassword(!showPassword)
          }
        />{" "}
        Show Password
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() =>
            setRememberMe(!rememberMe)
          }
        />{" "}
        Remember Me
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Link to="/register">
          Create New Account
        </Link>
      </div>
    </div>
  );
}

export default Login;