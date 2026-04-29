import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginWithEmail, observeAuthState } from "../firebase";
import { useAppStore } from "../store/useAppStore";

export default function LoginPage() {
  const setUser = useAppStore((state) => state.setUser);
  const [email, setEmail] = useState("care.manager@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email ?? "",
          displayName: user.displayName,
        });
        navigate("/");
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [navigate, setUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithEmail(email, password);
      const user = result.user;
      setUser({
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName,
      });
      navigate("/");
    } catch (authError) {
      setError(
        "Login failed. Use demo credentials or update Firebase values in src/firebase.ts.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <span>HealthCore</span>
          <p>Secure healthcare operations for teams.</p>
        </div>
        <h2>Sign in to continue</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="team@healthcore.com"
            />
          </label>
          <label>
            Password
            <div className="password-input-wrapper">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a href="#" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
        <div className="login-hint">
          <p>
            Use demo login with <strong>care.manager@example.com</strong> /{" "}
            <strong>password123</strong>, or update Firebase config in{" "}
            <code>src/firebase.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
