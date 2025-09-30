import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import "./Auth.css";

const ResetPassword = () => {
  const { request, loading, error } = useApi();
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      await request("post", "/auth/reset-password", {
        token,
        password: form.password
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Password Reset Successfully!</h1>
            <p className="auth-subtitle">
              Your password has been updated successfully.
            </p>
          </div>
          
          <div className="success-message">
            <div className="success-icon">✅</div>
            <p>You can now log in with your new password.</p>
          </div>
          
          <div className="auth-footer">
            <div className="auth-links">
              <Link to="/login" className="btn btn-primary btn-full">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">
            Enter your new password below.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
              className="form-input"
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="form-input"
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <div className="auth-links">
            <Link to="/login" className="auth-link">
              Back to Login
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
