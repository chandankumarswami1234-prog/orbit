import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRocket, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {

    if (!name.trim()) {
      toast.warning("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.warning("Please enter your email");
      return;
    }

    if (!password.trim()) {
      toast.warning("Please enter your password");
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(response.data);

      setName("");
      setEmail("");
      setPassword("");

      navigate("/");

    } catch (error) {

      console.error(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Registration Failed");
      }

    } finally {
      setLoading(false);
    }

  };

    return (
    <div className="login-container">

      <div className="login-card">

        <div className="logo">
          <FaRocket />
        </div>

        <h1>Create Account</h1>

        <p>
          Join Orbit and start managing your projects.
        </p>

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>
        </div>

        <button
          className="login-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <div className="register-link">

          <p>
            Already have an account?
          </p>

          <Link to="/">
            Login Here
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;