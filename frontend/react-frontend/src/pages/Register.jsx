import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <a href="#" className="back-link">← Back</a>
          <h1>Create your FocusPilot account</h1>
          <p className="auth-subtitle">
            Set up your space in a few seconds.
          </p>
        </header>

        <form
          id="registerForm"
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
        >
          <label>
            Name
            <input
              type="text"
              id="registerName"
              required
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              id="registerEmail"
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              id="registerPassword"
              required
              minLength={6}
              placeholder="At least 6 characters"
            />
          </label>

          <button type="submit" className="primary-btn full-width">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already using FocusPilot?{" "}
          <a href="/login">Login</a>
        </p>

        <p
          id="registerError"
          className="auth-error"
          aria-live="polite"
        ></p>
      </div>
    </div>
  );
}

export default Register;
