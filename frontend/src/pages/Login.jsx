import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRocket, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email.trim()) {
      toast.warning("Please enter your email");
      return;
    }

    if (!password.trim()) {
      toast.warning("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      if (!token) {
        toast.error("Invalid email or password");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("token", token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", token);
        localStorage.removeItem("token");
      }

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Login Failed"
        );
      } else {
        toast.error("Unable to connect to server");
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
    <div className="login-container">

      <div className="login-card">

        <div className="logo">
          <FaRocket />
        </div>

        <h1>Orbit</h1>

        <p>
          Team Collaboration & Task Management Platform
        </p>

        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <span
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>
        </div>

        <div className="options">

          <label>

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(!rememberMe)
              }
            />

            Remember Me

          </label>

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div className="register-link">

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Create New Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;