import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed");
        return;
      }
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Backend not reachable");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <header className="auth-header">
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Login to your FocusPilot workspace.</p>
        </header>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="•••••••"
            />
          </label>

          <button type="submit" className="primary-btn full-width">
            Login
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
